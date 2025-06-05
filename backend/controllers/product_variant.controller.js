const db = require('../models');
const ProductVariant = db.productVariant;

exports.getAll = async (req, res) => {
    try {
        const product_variants = await ProductVariant.findAll();
        res.status(200).json(product_variants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product variants' });
    }
};

exports.getById = async (req, res) => {
    try {
        const product_variant = await ProductVariant.findByPk(req.params.id);
        if (!product_variant) {
            return res.status(404).json({ error: 'Product variant not found' });
        }
        res.status(200).json(product_variant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product variant' });
    }
};

exports.create = async (req, res) => {
    try {
        const newVariant = await ProductVariant.create(req.body);
        res.status(201).json(newVariant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product variant' });
    }
};

exports.update = async (req, res) => {
    try {
        const product_variant = await ProductVariant.findByPk(req.params.id);
        if (!product_variant) {
            return res.status(404).json({ error: 'Product variant not found' });
        }
        await product_variant.update(req.body);
        res.status(200).json(product_variant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product variant' });
    }
};

exports.delete = async (req, res) => {
    try {
        const product_variant = await ProductVariant.findByPk(req.params.id);
        if (!product_variant) {
            return res.status(404).json({ error: 'Product variant not found' });
        }
        await product_variant.destroy();
        res.status(200).json({ message: 'Product variant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product variant' });
    }
};