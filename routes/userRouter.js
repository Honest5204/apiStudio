var express = require('express');
var router = express.Router();
const Users = require('../Model/user');

router.get('/getListUsers', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng!' });
    }
});

router.get('/getUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID cung cấp!' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng!' });
    }
});
router.post('/createUser', async (req, res) => {
    try {
        // Lấy thông tin users từ request body
        const { name , email, password } = req.body;

        // Tạo người dùng mới
        let image = 'https://i.pravatar.cc/300';
        let type = 'user';
        const users = new Users({ id, name , email, password , image,type});

        // Lưu sinh viên vào MongoDB
        await users.save();

        // Trả về thông tin người dùng vừa tạo
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo sinh viên!' });
    }
})
router.put('/updateUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { id, name , email, password , image} = req.body;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy nguoi dùng với ID cung cấp!' });
        }
        user.id = id;
        user.name = name;
        user.email = email;
        user.password = password;
        user.image = image;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng!' });
    }
});

router.get('/getId/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID cung cấp!' });
        }
        res.json({password : user.password});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng!' });
    }
});

router.put('/updatePassword/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const newPassword = req.body.password; // Lấy mật khẩu mới từ body của request

        // Kiểm tra xem mật khẩu mới có được cung cấp không
        if (!newPassword) {
            return res.status(400).json({ message: 'Mật khẩu mới không được để trống!' });
        }

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID cung cấp!' });
        }

        // Cập nhật mật khẩu mới cho người dùng
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Mật khẩu của người dùng đã được cập nhật thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật mật khẩu người dùng!' });
    }
});

module.exports = router;
