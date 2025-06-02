const productService = require('../services/product.service');

exports.create = async (req, res, next) => {
    try {
        const product = await productService.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const product = await productService.findOne(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const product = await productService.update(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await productService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};