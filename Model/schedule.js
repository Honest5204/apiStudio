// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    date: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    content: { type: String },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
