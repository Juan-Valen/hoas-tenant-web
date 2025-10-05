const Market = require('../models/marketModel');
const MarketImage = require('../models/marketImagesModel');
const mongoose = require('mongoose');
const { generateText } = require("../services/textGenerator");
const { analyzeMarketImages } = require("../services/imageAnalyzer");
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        fieldSize: 5 * 1024 * 1024, // 5MB field limit
        files: 10 // Max 10 files
    },
    fileFilter: (req, file, cb) => {
        // Allow only image files
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error(`Only image files are allowed! Got: ${file.mimetype}`));
        }
    }
});

// GET api/markets
const getAllMarkets = async (req, res) => {
    try {
        const markets = await Market.find({}).sort({ createdAt: -1 });
        res.status(200).json(markets);
    } catch (error) {
        res.status(500).json({ message: ("failed to retrieve reservations: " + error.message) });
    }
};

// GET api/markets/:marketId
const getMarketById = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const market = await Market.findById(marketId);
        if (!market) {
            return res.status(404).json({ message: "Market not found" });
        }

        // Get associated images for this market item
        const images = await MarketImage.find({ market_id: marketId });
        
        // Format image data to include only necessary info
        const imageList = images.map(image => ({
            id: image._id,
            filename: image.filename,
            originalName: image.originalName,
            contentType: image.img.contentType,
            createdAt: image.createdAt
        }));

        // Return market data with images
        res.status(200).json({
            ...market.toObject(),
            images: imageList
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to get Market" });
    }
};

// POST api/markets
const createMarket = async (req, res) => {
    const { description } = req.body;
    
    try {
        // Check description appropriateness
        const descCheck = await generateText(description);

        if (!descCheck) {
            return res.status(400).json({
                message: "Inappropriate description"
            });
        }

        // Create the market item first
        const newMarket = await Market.create({ ...req.body });
        
        // Handle image uploads if files are present
        let uploadedImages = [];
        let rejectedImages = [];
        
        if (req.files && req.files.length > 0) {
            try {
                // Prepare image files for analysis
                const imageFiles = req.files.map(file => ({
                    buffer: file.buffer,
                    mimeType: file.mimetype,
                    filename: file.originalname
                }));

                // Analyze all images together
                const imageAnalysis = await analyzeMarketImages(imageFiles);

                if (imageAnalysis.overallApproved) {
                    // All images approved - save to database
                    for (const file of req.files) {
                        const marketImage = new MarketImage({
                            market_id: newMarket._id,
                            img: {
                                data: file.buffer,
                                contentType: file.mimetype
                            },
                            filename: `${Date.now()}-${file.originalname}`,
                            originalName: file.originalname
                        });

                        const savedImage = await marketImage.save();
                        uploadedImages.push({
                            id: savedImage._id,
                            filename: savedImage.filename,
                            originalName: savedImage.originalName,
                            contentType: savedImage.img.contentType
                        });
                    }
                } else {
                    // Images rejected - track for user feedback
                    req.files.forEach(file => {
                        rejectedImages.push({
                            filename: file.originalname,
                        });
                    });
                }
            } catch (imageError) {
                // If image upload fails, we still return the market item but note the image error
                console.error('Image upload error:', imageError.message);
                return res.status(201).json({
                    market: newMarket,
                    images: [],
                    warning: "Market created but some images failed to upload"
                });
            }
        }

        // Return success response with market and images
        const response = {
            market: newMarket,
            images: uploadedImages,
            message: `Market created successfully${uploadedImages.length > 0 ? ` with ${uploadedImages.length} image(s)` : ''}`
        };

        // Add warning if some images were rejected
        if (rejectedImages.length > 0) {
            response.warning = `${rejectedImages.length} image(s) were rejected due to content policy violations`;
        }

        res.status(201).json(response);

    } catch (error) {
        res.status(400).json({
            message: "Failed to create market",
            error: error.message
        });
    }
};

// PUT /markets/:marketId
const updatedMarket = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const updatedMarket = await Market.findOneAndUpdate(
            { _id: marketId },
            { ...req.body },
            { new: true }
        );
        if (updatedMarket) {
            console.log(req.body);
            res.status(200).json(updatedMarket);
        } else {
            res.status(404).json({ message: "Market not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update Market" });
    }
};

// DELETE /markets/:marketId
const deleteMarket = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const deletedMarket = await Market.findOneAndDelete({ _id: marketId });
        if (deletedMarket) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ message: "Market not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Market" });
    }
};

// GET api/markets/:marketId/images - Get all images for a market item
const getMarketImages = async (req, res) => {
    const { marketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
        return res.status(400).json({ message: "Invalid market ID" });
    }

    try {
        const images = await MarketImage.find({ market_id: marketId });
        
        if (images.length === 0) {
            return res.status(404).json({ message: "No images found for this market item" });
        }

        // Return image metadata (not the actual image data)
        const imageList = images.map(image => ({
            id: image._id,
            filename: image.filename,
            originalName: image.originalName,
            contentType: image.img.contentType,
            createdAt: image.createdAt
        }));

        res.status(200).json(imageList);

    } catch (error) {
        res.status(500).json({ 
            message: "Failed to retrieve images", 
            error: error.message 
        });
    }
};

// GET api/markets/:marketId/images/:imageId - Get a specific image file
const getMarketImage = async (req, res) => {
    const { marketId, imageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(marketId) || !mongoose.Types.ObjectId.isValid(imageId)) {
        console.log('Invalid ObjectId format');
        return res.status(400).json({ message: "Invalid ID(s)" });
    }

    try {
        const image = await MarketImage.findOne({ _id: imageId, market_id: marketId });
        
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        console.log('Image details:', {
            contentType: image.img.contentType,
            dataLength: image.img.data.length,
            filename: image.filename
        });

        // Set proper headers for image display
        res.set({
            'Content-Type': image.img.contentType,
            'Content-Length': image.img.data.length,
            'Content-Disposition': `inline; filename="${image.filename}"`
        });
        
        // Send the actual image data
        res.send(image.img.data);

    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ message: "Failed to retrieve image" });
    }
};

// POST api/markets/analyze-image - Analyze images before upload
// POST api/markets/analyze-images - Analyze images before upload
const analyzeImageEndpoint = async (req, res) => {
    try {
        // Check if files were uploaded
        const files = req.files || (req.file ? [req.file] : []);
        if (files.length === 0) {
            return res.status(400).json({ message: "No image files provided" });
        }

        // Prepare image files for analysis
        const imageFiles = files.map(file => ({
            buffer: file.buffer,
            mimeType: file.mimetype,
            filename: file.originalname
        }));

        // Analyze the images using the service
        const analysis = await analyzeMarketImages(imageFiles);

        res.status(200).json({
            description: analysis.imagesDescription,
            approved: analysis.overallApproved,
            totalImages: files.length,
            message: analysis.overallApproved ? "Images approved for upload" : "Images rejected"
        });

    } catch (error) {
        console.error('Image analysis error:', error);
        res.status(500).json({ 
            message: "Failed to analyze images", 
            error: error.message 
        });
    }
};

module.exports = {
    getAllMarkets,
    getMarketById,
    createMarket,
    updatedMarket,
    deleteMarket,
    getMarketImages,
    getMarketImage,
    analyzeImageEndpoint,
    upload // Export the multer upload middleware
};