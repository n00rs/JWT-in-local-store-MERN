const express = require('express')
const { registerUser, loginUser, getUser } = require('../controllers/userControllers')
const { protect } = require('../middleWare/authMiddlewarre')
const router = express.Router()


router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/user', protect,getUser)                                            //using authmiddleware

module.exports =router