const db = require('../models');
const Product = db.Product;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const cacheService = require('../services/cache.service');

// Cache keys và TTL
const CACHE_KEYS = {
    ALL_PRODUCTS: 'products:all',
    PRODUCT_BY_ID: (id) => `products:${id}`,
    PRODUCTS_BY_BRAND: (brand) => `products:brand:${brand}`,
    PRODUCTS_BY_CATEGORY: (category) => `products:category:${category}`
};
const CACHE_TTL = 3600; // 1 giờ

// Multer configuration cho upload hình ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'products');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif, webp)!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).single('image');

// Utility function để xóa cache
const clearCache = async (productId = null, brand = null, category = null) => {
    try {
        await cacheService.del(CACHE_KEYS.ALL_PRODUCTS);
        if (productId) {
            await cacheService.del(CACHE_KEYS.PRODUCT_BY_ID(productId));
        }
        if (brand) {
            await cacheService.del(CACHE_KEYS.PRODUCTS_BY_BRAND(brand));
        }
        if (category) {
            await cacheService.del(CACHE_KEYS.PRODUCTS_BY_CATEGORY(category));
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};

const createImageUrl = (imagePath, host) => {
    if (!imagePath) return null;
    const relativePath = imagePath.replace(/\\/g, '/').replace(/.*\/uploads\//, 'uploads/');
    return `${host}/${relativePath}`;
};

exports.getAll = async (req, res) => {
    try {
        const cachedProducts = await cacheService.get(CACHE_KEYS.ALL_PRODUCTS);
        if (cachedProducts) {
            console.log('📦 Products loaded from cache');
            return res.json(cachedProducts);
        }
        const products = await Product.findAll();
        const host = req.protocol + '://' + req.get('host');
        const result = products.map(product => {
            const productData = product.toJSON();
            return {
                ...productData,
                image_url: createImageUrl(productData.image, host)
            };
        });
        await cacheService.set(CACHE_KEYS.ALL_PRODUCTS, result, CACHE_TTL);
        res.json(result);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const productId = req.params.id;
        const cacheKey = CACHE_KEYS.PRODUCT_BY_ID(productId);
        const cachedProduct = await cacheService.get(cacheKey);
        if (cachedProduct) {
            console.log(`📦 Product ${productId} loaded from cache`);
            return res.json(cachedProduct);
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const host = req.protocol + '://' + req.get('host');
        const productData = product.toJSON();
        const result = {
            ...productData,
            image_url: createImageUrl(productData.image, host)
        };
        await cacheService.set(cacheKey, result, CACHE_TTL);

        res.json(result);
    } catch (err) {
        console.error(`Error fetching product ${req.params.id}:`, err);
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const productData = {
                name: req.body.name,
                description: req.body.description,
                brand_id: req.body.brand_id,
                category_id: req.body.category_id,
                sku: req.body.sku,
                barcode: req.body.barcode,
                price: req.body.price,
                cost: req.body.cost,
                status: req.body.status || 'active',
                image: req.file ? `uploads/products/${req.file.filename}` : null
            };

            const newProduct = await Product.create(productData);
            const host = req.protocol + '://' + req.get('host');
            const result = {
                ...newProduct.toJSON(),
                image_url: createImageUrl(newProduct.image, host)
            };
            await clearCache(null, req.body.brand_id, req.body.category_id);

            res.status(201).json(result);
        } catch (err) {
            console.error('Error creating product:', err);
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: err.message });
        }
    });
};

exports.update = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const updateData = {
                name: req.body.name,
                description: req.body.description,
                brand_id: req.body.brand_id,
                category_id: req.body.category_id,
                sku: req.body.sku,
                barcode: req.body.barcode,
                price: req.body.price,
                cost: req.body.cost,
                status: req.body.status
            };
            if (req.file) {
                if (product.image) {
                    const oldImagePath = path.join(__dirname, '..', product.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = `uploads/products/${req.file.filename}`;
            } else if (req.body.removeImage === 'true' && product.image) {
                const oldImagePath = path.join(__dirname, '..', product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                updateData.image = null;
            }
            await product.update(updateData);
            const host = req.protocol + '://' + req.get('host');
            const result = {
                ...product.toJSON(),
                image_url: createImageUrl(product.image, host)
            };
            await clearCache(productId, req.body.brand_id, req.body.category_id);

            res.json(result);
        } catch (err) {
            console.error(`Error updating product ${req.params.id}:`, err);
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: err.message });
        }
    });
};

exports.delete = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await product.destroy();
        await clearCache(productId, product.brand_id, product.category_id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(`Error deleting product ${productId}:`, err);
        res.status(500).json({ message: err.message });
    }
};

exports.getByBrand = async (req, res) => {
    try {
        const brand = req.params.brand;
        const cacheKey = CACHE_KEYS.PRODUCTS_BY_BRAND(brand);

        const cachedProducts = await cacheService.get(cacheKey);
        if (cachedProducts) {
            console.log(`📦 Products by brand ${brand} loaded from cache`);
            return res.json(cachedProducts);
        }

        const products = await Product.findAll({ where: { brand_id: brand } });

        const host = req.protocol + '://' + req.get('host');
        const result = products.map(product => {
            const productData = product.toJSON();
            return {
                ...productData,
                image_url: createImageUrl(productData.image, host)
            };
        });

        await cacheService.set(cacheKey, result, CACHE_TTL);
        res.json(result);
    } catch (err) {
        console.error(`Error fetching products by brand ${req.params.brand}:`, err);
        res.status(500).json({ message: err.message });
    }
};

exports.getByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const cacheKey = CACHE_KEYS.PRODUCTS_BY_CATEGORY(category);
        const cachedProducts = await cacheService.get(cacheKey);
        if (cachedProducts) {
            console.log(`📦 Products by category ${category} loaded from cache`);
            return res.json(cachedProducts);
        }
        const products = await Product.findAll({ where: { category_id: category } });
        const host = req.protocol + '://' + req.get('host');
        const result = products.map(product => {
            const productData = product.toJSON();
            return {
                ...productData,
                image_url: createImageUrl(productData.image, host)
            };
        });
        await cacheService.set(cacheKey, result, CACHE_TTL);
        res.json(result);
    } catch (err) {
        console.error(`Error fetching products by category ${req.params.category}:`, err);
        res.status(500).json({ message: err.message });
    }
};
