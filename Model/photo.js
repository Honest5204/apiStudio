const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: String, required: true },
    size: { type: String, required: true },
    images: { type: [String], required: true },
});

const Photos = mongoose.model('Photos', PhotoSchema);


module.exports = Photos
