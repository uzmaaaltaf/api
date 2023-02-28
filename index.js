const express = require("express");
const app = express()
const port = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

const mongoose = require('./api/helper/db.helper')
const authRoutes = require('./api/routes/db.routes')
mongoose()

app.use('/api', authRoutes)
app.listen(port, ()=>{
    console.log("-------------->Working", port);
})
