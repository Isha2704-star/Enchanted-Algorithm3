require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Review = require('./models/Review');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/cityserve')
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// 🟢 POST: Add Review
app.post('/add-review', async (req, res) => {
  try {
    const { service, rating, text } = req.body;

    const newReview = new Review({
      service,
      rating,
      text
    });

    await newReview.save();

    res.json({ message: "Review saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔵 GET: Fetch Reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});