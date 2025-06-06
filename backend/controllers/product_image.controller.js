const db = require('../models');
const ProductImage = db.ProductImage; // đúng tên theo models/index.js

// Lấy tất cả hình ảnh sản phẩm
exports.getAll = async (req, res) => {
    try {
        const product_images = await ProductImage.findAll();
        res.status(200).json(product_images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product images' });
    }
};

// Lấy hình ảnh theo ID
exports.getById = async (req, res) => {
    try {
        const product_image = await ProductImage.findByPk(req.params.id);
        if (!product_image) {
            return res.status(404).json({ error: 'Product image not found' });
        }
        res.status(200).json(product_image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product image' });
    }
};

// Tạo mới hình ảnh
exports.create = async (req, res) => {
    try {
        const newImage = await ProductImage.create(req.body);
        res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product image' });
    }
};

// Cập nhật hình ảnh
exports.update = async (req, res) => {
    try {
        const product_image = await ProductImage.findByPk(req.params.id);
        if (!product_image) {
            return res.status(404).json({ error: 'Product image not found' });
        }
        await product_image.update(req.body);
        res.status(200).json(product_image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product image' });
    }
};

// Xóa hình ảnh
exports.delete = async (req, res) => {
    try {
        const product_image = await ProductImage.findByPk(req.params.id);
        if (!product_image) {
            return res.status(404).json({ error: 'Product image not found' });
        }
        await product_image.destroy();
        res.status(200).json({ message: 'Product image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product image' });
    }
};
