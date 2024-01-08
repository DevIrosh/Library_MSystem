// src/models/book.model.js
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({

  bookName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
    enum: ['All', 'Novels', 'Education', 'Academic Journals', 'Business and Economics', 'Computer Science', 'Engineering and Technology'],
  },
  status: {
    type: String,
    default: 'Available',
    enum: ['Available', 'Reserved', 'Borrowed'],
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
