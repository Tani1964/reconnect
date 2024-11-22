const express = require('express')
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const authMiddleware = require('./middleWare/authMiddleware')
require('dotenv').config()
app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
app.use('/api/user', userRoute)
app.use('/api/auth', authMiddleware, authRoute)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));
