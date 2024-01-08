// src/routes/category.route.js
const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

// Define routes for categories
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', addCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
