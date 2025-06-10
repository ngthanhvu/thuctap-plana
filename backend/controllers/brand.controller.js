const db = require('../models');
const Brand = db.Brand;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    ALL_BRANDS: 'brands:all',
    BRAND_BY_ID: (id) => `brands:${id}`
};

const CACHE_TTL = 3600;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/brands')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
        cb(null, true);
    }
}).single('image');

exports.getAll = async (req, res) => {
    try {
        const cachedBrands = await cacheService.get(CACHE_KEYS.ALL_BRANDS);
        if (cachedBrands) {
            console.log('📦 Brands loaded from cache');
            return res.status(200).json(cachedBrands);
        }

        const brands = await Brand.findAll();

        const host = req.protocol + '://' + req.get('host');
        const result = brands.map(brand => {
            const { id, name, description, image } = brand.toJSON();
            return {
                id,
                name,
                description,
                image_url: image ? `${host}/${image.replace(/\\/g, '/')}` : null
            };
        });

        await cacheService.set(CACHE_KEYS.ALL_BRANDS, result, CACHE_TTL);
        console.log('💾 Brands cached successfully');

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getAll brands:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const brandId = req.params.id;
        const cacheKey = CACHE_KEYS.BRAND_BY_ID(brandId);

        const cachedBrand = await cacheService.get(cacheKey);
        if (cachedBrand) {
            console.log(`📦 Brand ${brandId} loaded from cache`);
            return res.status(200).json(cachedBrand);
        }

        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy brand' });
        }

        const host = req.protocol + '://' + req.get('host');
        const result = {
            id: brand.id,
            name: brand.name,
            description: brand.description,
            image_url: brand.image ? `${host}/${brand.image.replace(/\\/g, '/')}` : null
        };

        await cacheService.set(cacheKey, result, CACHE_TTL);
        console.log(`💾 Brand ${brandId} cached successfully`);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getById brand:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const brandData = {
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.path : null
            };

            const brand = await Brand.create(brandData);

            await cacheService.del(CACHE_KEYS.ALL_BRANDS);
            console.log('🗑️ All brands cache cleared after create');

            res.status(201).json(brand);
        } catch (error) {
            console.error('Error in create brand:', error);
            res.status(500).json({ message: error.message });
        }
    });
};

exports.update = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const brandId = req.params.id;
            const brand = await Brand.findByPk(brandId);
            if (!brand) {
                return res.status(404).json({ message: 'Không tìm thấy brand' });
            }

            if (req.file && brand.image && fs.existsSync(brand.image)) {
                fs.unlinkSync(brand.image);
            }

            const updateData = {
                name: req.body.name,
                description: req.body.description
            };

            if (req.body.removeImage === 'true') {
                if (brand.image && fs.existsSync(brand.image)) {
                    fs.unlinkSync(brand.image);
                }
                updateData.image = null;
            } else if (req.file) {
                updateData.image = req.file.path;
            }

            await brand.update(updateData);

            await Promise.all([
                cacheService.del(CACHE_KEYS.ALL_BRANDS),
                cacheService.del(CACHE_KEYS.BRAND_BY_ID(brandId))
            ]);
            console.log(`🗑️ Brand ${brandId} cache cleared after update`);

            res.status(200).json(brand);
        } catch (error) {
            console.error('Error in update brand:', error);
            res.status(500).json({ message: error.message });
        }
    });
};

exports.delete = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy brand' });
        }

        if (brand.image && fs.existsSync(brand.image)) {
            fs.unlinkSync(brand.image);
        }

        await brand.destroy();

        await Promise.all([
            cacheService.del(CACHE_KEYS.ALL_BRANDS),
            cacheService.del(CACHE_KEYS.BRAND_BY_ID(brandId))
        ]);
        console.log(`🗑️ Brand ${brandId} cache cleared after delete`);

        res.status(200).json({ message: 'Brand đã được xóa thành công' });
    } catch (error) {
        console.error('Error in delete brand:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.clearCache = async (req, res) => {
    try {
        await cacheService.del(CACHE_KEYS.ALL_BRANDS);
        res.status(200).json({ message: 'Cache đã được xóa thành công' });
    } catch (error) {
        console.error('Error clearing cache:', error);
        res.status(500).json({ message: error.message });
    }
};