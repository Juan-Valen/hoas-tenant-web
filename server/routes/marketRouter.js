const express = require('express');
const router = express.Router();
const {
    getAllMarkets,
    getMarketById,
    createMarket,
    updatedMarket,
    deleteMarket,
    getMarketImages,
    getMarketImage,
    analyzeImageEndpoint,
    upload
} = require("../controllers/marketControllers")

router.get('/', getAllMarkets);

// Analyze images before upload
router.post('/analyze-images', upload.array('images', 5), analyzeImageEndpoint);

router.get('/:marketId', getMarketById);
router.post('/', upload.array('images', 5), createMarket); // Allow up to 5 images
router.put('/:marketId', updatedMarket);
router.delete('/:marketId', deleteMarket);

// Image routes
router.get('/:marketId/images', getMarketImages); // Get list of images for a market item
router.get('/:marketId/images/:imageId', getMarketImage); // Get specific image file

module.exports = router;
