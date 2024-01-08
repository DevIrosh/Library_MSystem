// src/routes/transaction.route.js
const express = require('express');
const router = express.Router();
const { getAllTransactions, getTransactionById, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller');

// Define routes for transactions
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', addTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;
