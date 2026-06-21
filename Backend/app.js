const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./db/db');
const userRouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');
// Connect to MongoDB
connectToDB();


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define your routes here
app.use('/users', userRouter);



module.exports = app;