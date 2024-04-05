const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
});

const Videos = mongoose.model('Videos', videoSchema);

module.exports = Videos
