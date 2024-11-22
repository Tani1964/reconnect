const express = require('express')
const User = require('../models/users.model.js')
const router = express.Router()
const {getAllUsers }= require('../controllers/userController.js')

router.get('/', getAllUsers)

module.exports = router
