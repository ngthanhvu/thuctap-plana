const db = require('../models');
const Product = db.Product;

exports.getAll = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};
