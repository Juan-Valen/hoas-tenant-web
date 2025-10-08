const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
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

router.post('/', createUser)
router.post('/login', loginUser)

router.use(requireAuth)

router.get('/', getAllUsers);
router.get('/:userId', getUserById)
router.put('/password/', updatePassword)
router.put('/password/reset/:userId', resetPassword)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router;
