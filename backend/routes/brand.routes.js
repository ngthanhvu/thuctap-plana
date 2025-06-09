const express = require('express');
const router = express.Router();
const controller = require('../controllers/brand.controller');
const multer = require('multer');
const upload = multer(); // sử dụng memoryStorage để đọc file từ req.file.buffer

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('image'), controller.create); // 👈 Sửa lại tên field
router.put('/:id', upload.single('image'), controller.update); // 👈
router.delete('/:id', controller.delete);

module.exports = router;
