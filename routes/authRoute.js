const express = require('express')
const User = require('../models/users.model.js')
const router = express.Router()
const {signin, signup, signout }= require('../controllers/userController.js')
const authMiddleware = require('../middleWare/authMiddleware.js')

router.post('/login',signin)

module.exports = router
