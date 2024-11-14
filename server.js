const express = require('express')
app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

app.get('/',(req, res)=>{
    res.json({'message':'working'})
})