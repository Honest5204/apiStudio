const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

const Albums = mongoose.model('Albums', albumSchema);

module.exports = Albums
