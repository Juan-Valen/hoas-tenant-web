const express = require('express');
const router = express.Router();
const {
    getAllSpaces,
    getSpaceById,
    createSpace,
    updatedSpace,
    deleteSpace
} = require("../controllers/spaceControllers")

router.get('/', getAllSpaces);
router.get('/:itemId', getSpaceById)
router.post('/', createSpace)
router.put('/:itemId', updatedSpace)
router.delete('/:itemId', deleteSpace)

module.exports = router;
