const db = require("../models");

class ProductService {
    async create(productData) {
        try {
            return await db.products.create(productData);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await db.products.findAll();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id) {
        try {
            const product = await db.products.findByPk(id);
            if (!product) throw new Error('Product not found');
            return product;
        } catch (error) {
            throw error;
        }
    }

    async update(id, productData) {
        try {
            const product = await this.findOne(id);
            return await product.update(productData);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const product = await this.findOne(id);
            return await product.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();