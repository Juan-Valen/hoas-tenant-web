const express = require('express');
const router = express.Router();
const {
    getAllMarkets,
    getMarketById,
    createMarket,
    updatedMarket,
    deleteMarket
} = require("../controllers/marketControllers")

router.get('/', getAllMarkets);
router.get('/:marketId', getMarketById)
router.post('/', createMarket)
router.put('/:marketId', updatedMarket)
router.delete('/:marketId', deleteMarket)

module.exports = router;
