const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser
} = require("../controllers/userControllers")

router.get('/', getAllUsers);
router.get('/:userId', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router;