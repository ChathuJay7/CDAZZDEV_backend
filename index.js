const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const authController = require('./controllers/authController')
const postController = require('./controllers/postController')

const app = express()

// connect db
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => {
    console.log('DB is connected successfully');
    // Your server code or additional setup can go here
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });


// server is on port 5000. client is on port 3000. We are going to get a cors error!. But cors() removes that error
app.use(cors())

// those two middlewares mae req.body accessible, otherwise it would be undefined
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/auth', authController)
app.use('/post', postController)

// start server
app.listen(process.env.PORT, () => console.log(`Server has been started in ${process.env.PORT} successfully`))