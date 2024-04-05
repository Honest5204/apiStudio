// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const Schedule = require('../Model/schedule');

// Route để lấy danh sách lịch hẹn
router.get('/getSchedule', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu lịch hẹn!' });
    }
});
// Route để đặt lịch hẹn
router.post('/schedule', async (req, res) => {
    try {
        const {userName,userEmail, date, phoneNumber, content } = req.body;

        // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ hay chưa
        if (!date || !phoneNumber || !userName || !userEmail) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }
        // Tạo một bản ghi mới trong cơ sở dữ liệu
        const newSchedule = new Schedule({
            userName,
            userEmail,
            date,
            phoneNumber,
            content,
        });

        // Lưu bản ghi vào cơ sở dữ liệu
        await newSchedule.save();

        res.status(201).json({ message: 'Đặt lịch hẹn thành công' });
    } catch (error) {
        console.error('Lỗi khi đặt lịch hẹn:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi đặt lịch hẹn' });
    }
});

module.exports = router;
