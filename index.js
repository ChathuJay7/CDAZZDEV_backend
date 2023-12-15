const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
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


// start server
app.listen(process.env.PORT, () => console.log(`Server has been started in ${process.env.PORT} successfully`))