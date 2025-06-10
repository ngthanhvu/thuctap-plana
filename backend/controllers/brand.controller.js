const db = require('../models');
const Brand = db.Brand;
const fs = require('fs');
const multer = require('multer');
const path = require('path');

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

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);

        const host = req.protocol + '://' + req.get('host');
        const result = {
            id: brand.id,
            name: brand.name,
            description: brand.description,
            image_url: brand.image ? `${host}/${brand.image.replace(/\\/g, '/')}` : null
        };

        res.status(200).json(result);
    } catch (error) {
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
            res.status(201).json(brand);
        } catch (error) {
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
            const brand = await Brand.findByPk(req.params.id);
            if (!brand) {
                return res.status(404).json({ message: 'Không tìm thấy brand' });
            }

            const updateData = {
                name: req.body.name,
                description: req.body.description
            };

            if (req.file) {
                updateData.image = req.file.path;
            }

            await brand.update(updateData);
            res.status(200).json(brand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

exports.delete = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy brand' });
        }

        if (brand.image && fs.existsSync(brand.image)) {
            fs.unlinkSync(brand.image);
        }

        await brand.destroy();
        res.status(200).json({ message: 'Brand đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};