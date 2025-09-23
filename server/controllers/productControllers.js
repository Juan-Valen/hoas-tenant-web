const Product = require("../models/productModel");

// GET /api/products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "Approved" }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};

// POST /api/products
const createProduct = async (req, res) => {
    try {
        const { title, description, price, free, sellerName, category, images } = req.body;

        if (!title || (!free && !price) || !sellerName) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProduct = await Product.create({
            title,
            description,
            price: free ? 0 : price,
            free,
            sellerName,
            category,
            images
        });

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Failed to create product", error: err.message });
    }
};

module.exports = { getAllProducts, createProduct };
