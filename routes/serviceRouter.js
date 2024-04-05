const express = require('express');
const Service = require("../Model/service");
const router = express.Router();

router.get('/getListService', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu dinh vu!' });
    }
});
router.post('/addservice', async (req, res) => {
    try {
        const {  name, image, content } = req.body;
        const service = new Service({ name, image, content });
        await service.save();
        res.status(201).json({ message: 'Dịnh vụ đã được thêm thành công!' });
    } catch (error) {
        console.error('Lỗi khi thêm tin tức:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm tin tức.' });
    }
});

// Endpoint để sửa tin tức
router.put('/updateservice/:id', async (req, res) => {
    try {
        const serviceID = req.params.id;
        const { name ,image, content} = req.body;
        const service = await Service.findById(serviceID);
        if (!service) {
            return res.status(404).json({ message: 'Không tìm thấy dịnh vụ với ID cung cấp!' });
        }
        service.name = name;
        service.content = content;
        service.image = image;
        await service.save();
        res.json(service);
    } catch (error) {
        console.error('Lỗi khi sửa dịnh vụ:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi sửa dịnh vụ.' });
    }
});

// Endpoint để xóa tin tức
router.delete('/deleteservice/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Không tìm thấy dịnh vụ với ID cung cấp!' });
        }
        await Service.deleteOne({ _id: serviceId }); // Xóa sinh viên từ cơ sở dữ liệu
        res.json({ message: 'Xóa dịnh vụ thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa dịnh vụ!' });
    }
});
module.exports = router;
