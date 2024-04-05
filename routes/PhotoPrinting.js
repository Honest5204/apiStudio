// routes/order.js
const express = require('express');
const router = express.Router();
const Photo = require('../Model/photo');

router.post('/photoPrinting', async (req, res) => {
    try {
        const { name, email, address, quantity, size, images } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !email || !address || !quantity || !size || !images || images.length === 0) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin và tải lên ít nhất một hình ảnh.' });
        }

        const id = Math.floor(Math.random() * 1000000); // Tạo ID ngẫu nhiên
        const photo = new Photo({
            id,
            name,
            email,
            address,
            quantity,
            size,
            images
        });

        await photo.save();

        res.status(201).json({ message: 'Đơn hàng đã được nhận và lưu trữ thành công!' });
    } catch (error) {
        console.error('Lỗi khi xử lý đơn hàng:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình xử lý đơn hàng.' });
    }
});

module.exports = router;
