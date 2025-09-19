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
router.get('/:spaceId', getSpaceById)
router.post('/', createSpace)
router.put('/:spaceId', updatedSpace)
router.delete('/:spaceId', deleteSpace)

module.exports = router;
