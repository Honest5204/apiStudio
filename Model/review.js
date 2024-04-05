const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review
