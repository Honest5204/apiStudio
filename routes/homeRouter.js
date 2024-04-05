const express = require('express');
const router = express.Router();
const Service = require('../Model/service');
const Album = require('../Model/album');
const Product = require('../Model/product');
const News = require('../Model/news');
const Video = require('../Model/video');
const Review = require('../Model/review');

router.get('/featuredData', async (req, res) => {
    try {
        // Lấy danh sách dịch vụ nổi bật
        const services = await Service.find();

        // Lấy danh sách album nổi bật
        const albums = await Album.find();

        // Lấy danh sách sản phẩm mới nhất
        const products = await Product.find().sort({ createdAt: -1 }).limit(5);

        // Lấy danh sách tin tức mới nhất
        const news = await News.find()

        // Lấy danh sách video nổi bật
        const videos = await Video.find();

        // Lấy danh sách đánh giá nổi bật
        const reviews = await Review.find();
        const responseData = [
            { title: 'Dịch vụ nổi bật', items: services },
            { title: 'Album nổi bật', items: albums },
            { title: 'Sản phẩm mới nhất', items: products },
            { title: 'Tin tức mới nhất', items: news },
            { title: 'Video nổi bật', items: videos },
            { title: 'Đánh giá nổi bật', items: reviews }
        ];
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching featured data' });
    }
});

module.exports = router;
