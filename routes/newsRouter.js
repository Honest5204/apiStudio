const express = require('express');
const News = require("../Model/news");
const router = express.Router();
router.get('/getListNews', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    }  catch (error) {
        console.error(error);
        res.status(500).json({message: 'Lỗi khi lấy dữ liệu tin tức!'});
    }
});
// Endpoint để thêm tin tức mới
router.post('/addnews', async (req, res) => {
    try {
        const {  name, content, image } = req.body;
        const news = new News({ name, content, image });
        await news.save();
        res.status(201).json({ message: 'Tin tức đã được thêm thành công!' });
    } catch (error) {
        console.error('Lỗi khi thêm tin tức:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm tin tức.' });
    }
});

// Endpoint để sửa tin tức
router.put('/updatenews/:id', async (req, res) => {
    try {
        const newsId = req.params.id;
        const { name ,content, image} = req.body;
        const news = await News.findById(newsId);
        if (!news) {
            return res.status(404).json({ message: 'Không tìm thấy tin tức với ID cung cấp!' });
        }
        news.name = name;
        news.content = content;
        news.image = image;
        await news.save();
        res.json(news);
    } catch (error) {
        console.error('Lỗi khi sửa tin tức:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi sửa tin tức.' });
    }
});

// Endpoint để xóa tin tức
router.delete('/deletenews/:id', async (req, res) => {
    try {
        const newsid = req.params.id;
        const news = await News.findById(newsid);
        if (!news) {
            return res.status(404).json({ message: 'Không tìm thấy tin tức với ID cung cấp!' });
        }
        await News.deleteOne({ _id: newsid }); // Xóa sinh viên từ cơ sở dữ liệu
        res.json({ message: 'Xóa sinh viên thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa sinh viên!' });
    }
});
module.exports = router;

