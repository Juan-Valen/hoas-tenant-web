const express = require("express");
const router = express.Router();
const Market = require("./marketModel");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Market.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST new product
router.post("/products", async (req, res) => {
  try {
    const newProduct = new Market(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

module.exports = router;
