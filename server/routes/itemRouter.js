const express = require('express');
const router = express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updatedItem,
    deleteItem
} = require("../controllers/itemControllers")

router.get('/', getAllItems);
router.get('/:itemId', getItemById)
router.post('/', createItem)
router.put('/:itemId', updatedItem)
router.delete('/:itemId', deleteItem)

module.exports = router;
