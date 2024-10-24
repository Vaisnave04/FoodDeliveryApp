// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodDelivery', { useNewUrlParser: true, useUnifiedTopology: true });

// Food item schema
const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String
});

const Food = mongoose.model('Food', foodSchema);

// API route to get food items
app.get('/api/food', async (req, res) => {
    const foodItems = await Food.find();
    res.json(foodItems);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
