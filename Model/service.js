const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true }
});

const Service = mongoose.model('Services', serviceSchema);

module.exports = Service
