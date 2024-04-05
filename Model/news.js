const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

const News = mongoose.model('News', newSchema);

module.exports = News
