const db = require('../models');
const Category = db.Category;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    ALL_CATEGORIES: 'categories:all',
    CATEGORY_BY_ID: (id) => `categories:${id}`
};
const CACHE_TTL = 300;

exports.getAll = async (req, res) => {
    try {
        const cachedCategories = await cacheService.get(CACHE_KEYS.ALL_CATEGORIES);
        if (cachedCategories) {
            console.log('📦 Categories loaded from cache');
            return res.json(cachedCategories);
        }
        const categories = await Category.findAll({
            where: {
                deleted_at: null
            }
        });

        const result = categories.map(category => {
            return {
                id: category.id,
                name: category.name,
                parentId: category.parentId
            };
        })
        await cacheService.set(CACHE_KEYS.ALL_CATEGORIES, result, CACHE_TTL);

        res.json(result);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const cacheKey = CACHE_KEYS.CATEGORY_BY_ID(categoryId);

        const cachedCategory = await cacheService.get(cacheKey);
        if (cachedCategory) {
            console.log(`📦 Category ${categoryId} loaded from cache`);
            return res.json(cachedCategory);
        }

        const category = await Category.findOne({
            where: {
                id: categoryId,
                deleted_at: null
            }
        });
        if (!category) {
            return res.status(404).json({ message: 'Not found' });
        }

        const result = {
            id: category.id,
            name: category.name,
            parentId: category.parentId
        };

        await cacheService.set(cacheKey, result, CACHE_TTL);
        res.json(result);
    } catch (error) {
        console.error(`Error fetching category ${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        await clearCache();
        res.status(201).json(category);
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Not found' });
        }
        await category.update(req.body);
        await clearCache(categoryId);
        res.json(category);
    } catch (err) {
        console.error(`Error updating category ${req.params.id}:`, err);
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Not found' });
        }

        // Soft delete the category
        await category.destroy();

        await clearCache(categoryId);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(`Error deleting category ${categoryId}:`, err);
        res.status(500).json({ message: err.message });
    }
};

const clearCache = async (categoryId = null) => {
    try {
        await cacheService.del(CACHE_KEYS.ALL_CATEGORIES);
        if (categoryId) {
            await cacheService.del(CACHE_KEYS.CATEGORY_BY_ID(categoryId));
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};