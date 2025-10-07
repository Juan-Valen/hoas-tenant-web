const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    updatePassword,
    resetPassword
} = require("../controllers/userControllers")

router.get('/', getAllUsers);
router.get('/:userId', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/password/', updatePassword)
router.put('/password/reset/:userId', resetPassword)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router;
