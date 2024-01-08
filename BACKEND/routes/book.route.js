// book.route.js

const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/book.controller');

// Define routes for books
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.post('/delbooks', deleteBook);

module.exports = router;
