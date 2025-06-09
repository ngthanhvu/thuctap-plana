const db = require('../models');
const Brand = db.Brand;
const fs = require('fs');
const path = require('path');
const cache = require('../services/cache.service'); // ❌ Tạm thời comment Redis

const formatBrand = (brandInstance) => {
    const { createdAt, updatedAt, created_at, updated_at, ...raw } = brandInstance.toJSON();
    return {
        ...raw,
        image_url: raw.image ? `/uploads/${raw.image}` : null
    };
};

exports.getAll = async (req, res) => {
    try {
        const cacheKey = 'brands:all';
        const cached = await cache.get(cacheKey);
        if (cached) return res.json(cached);

        const brands = await Brand.findAll({ order: [['created_at', 'DESC']] });
        const result = brands.map(formatBrand);

        await cache.set(cacheKey, result, 1800);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        res.json(formatBrand(brand));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        if (!req.body.name || req.body.name.trim() === '') {
            return res.status(400).json({ message: 'Name is required' });
        }

        let image = null;
        if (req.file) {
            const uploadsDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const timestamp = Date.now();
            const ext = path.extname(req.file.originalname);
            image = `brand_${timestamp}${ext}`;
            fs.writeFileSync(path.join(uploadsDir, image), req.file.buffer);
        }

        const brand = await Brand.create({
            name: req.body.name.trim(),
            description: req.body.description?.trim() || null,
            image
        });

        await cache.del('brands:all');
        res.status(201).json(formatBrand(brand));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        if (req.body.name !== undefined && req.body.name.trim() === '') {
            return res.status(400).json({ message: 'Name cannot be empty' });
        }

        let newImage = brand.image;

        if (req.file) {
            const uploadsDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const timestamp = Date.now();
            const ext = path.extname(req.file.originalname);
            newImage = `brand_${timestamp}${ext}`;
            fs.writeFileSync(path.join(uploadsDir, newImage), req.file.buffer);

            if (brand.image) {
                const oldPath = path.join(uploadsDir, brand.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        await brand.update({
            name: req.body.name !== undefined ? req.body.name.trim() : brand.name,
            description: req.body.description !== undefined ? req.body.description?.trim() || null : brand.description,
            image: newImage
        });

        await cache.del('brands:all');
        res.json(formatBrand(brand));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        if (brand.image) {
            const filePath = path.join(__dirname, '../uploads', brand.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await brand.destroy();
        await cache.del('brands:all');

        res.json({ message: 'Brand deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        if (!brand.image) return res.status(404).json({ message: 'No image to delete' });

        const filePath = path.join(__dirname, '../uploads', brand.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await brand.update({ image: null });
        await cache.del('brands:all');

        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
