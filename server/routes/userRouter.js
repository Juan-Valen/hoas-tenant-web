const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updatedUser,
    deleteUser
} = require("../controllers/userControllers")

router.get('/', getAllUsers);
router.get('/:userId', getUserById)
router.post('/', createUser)
router.put('/:userId', updatedUser)
router.delete('/:userId', deleteUser)

module.exports = router;