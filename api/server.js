const express = require('express');
const cors = require('cors');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const path = require('path');
const connectDB = require('./config/db')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/campaign', require('./routes/campaignRoute'))


app.use(errorHandler)

const port = process.env.PORT || 8000;

app.listen(port, ()=> { console.log(`Server started on port ${port}`) })