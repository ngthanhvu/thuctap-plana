const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const SECRET_KEY = 'my-secret-key';


exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const users = await User.create(req.body);
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        await users.update(req.body);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        await users.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        // check gmai xem chung không 
        const exstingUser = await User.findOne({ where: {email}});
        if(exstingUser){
            return res.status(400).json({message: 'Email đã tồn tại'});
        } 
        // hasdPass 
        const HashedPassword = await bcrypt.hash(password, 10);
        // tao user
        const user = await User.create({
            name,
            email,
            password: HashedPassword
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ message: 'Không có người dùng' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng' });

      // tạo token
      const token = jwt.sign(
         { id: user.id, email: user.email, role_id: user.role_id },
         SECRET_KEY,
         { expiresIn: '1h' }
      );

      // rút gọn thông tin trả về 
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id
      }

      res.json({ user: userData, token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}