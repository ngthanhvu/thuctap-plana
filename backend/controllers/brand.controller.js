const db = require('../models');
const Brand = db.Brand;

exports.getAll = async (req, res) => {
    const brands = await Brand.findAll();
    res.json(brands);
};
