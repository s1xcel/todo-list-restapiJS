require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan(process.env.LOG_LEVEL || 'dev'));

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

module.exports = app;
