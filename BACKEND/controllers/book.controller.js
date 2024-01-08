const Book = require('../models/book.model');

// Controller logic for books

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  const {bookName, categoryName, status} = new Book(req.body);
  try {
    
    const newBook = new Book({ bookName, categoryName, status });
    const savedBook = await newBook.save();
    res.json(savedBook);
    
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};


const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Delete the book from the Book collection based on _id
    const deletedBook = await Book.deleteOne({ _id: bookId });

    // Check if the book was found and deleted
    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Send a response with the data of the deleted book
    res.json({ status: 'Ok', data: { _id: bookId } });
  } catch (error) {
    // Handle errors, log them, and send a response with a 500 status and an error message
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};




module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
