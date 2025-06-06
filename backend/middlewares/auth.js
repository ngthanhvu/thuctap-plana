const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Token không tồn tại' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token không hợp lệ' });

        req.user = user; // Gán user vào request
        next();
    });
};

// Hàm lấy user từ token
exports.getUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Chưa xác thực' });
    }
    res.json({ user: req.user });
};
