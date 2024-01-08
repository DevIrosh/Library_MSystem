// src/models/transaction.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionID: {
    type: String,
    
  },
  userID: {
    type: String,
    
  },
  fullName: {
    type: String,
    
  },
  borrowedBook: {
    type: String,
    
  },
  returnDate: {
    type: Date,
    
  },
  status: {
    type: String,
    default: 'Borrowed',
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
