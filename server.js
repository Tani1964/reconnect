const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));

app.get('/',(req, res)=>{
    res.json({'message':'working'})
})