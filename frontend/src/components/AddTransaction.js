import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const [transactionData, setTransactionData] = useState({
    transactionID: '',
    userID: '',
    fullName: '',
    borrowedBook: '',
    returnDate: '',
    status: 'Borrowed', // Assuming 'Borrowed' is the default status
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/api/transactions', transactionData);

      if (response.status === 201) {

        alert('Transaction added successfully!');
        // Optionally, you can redirect the user to the transaction list page or perform other actions.
        navigate('/Transactions'); // Adjust the path based on your route

      } else {
        console.error('Error adding transaction:', response.data && response.data.error);
        alert('Error adding transaction. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add New Transaction</h3>
      <form onSubmit={handleAddTransaction}>
        <div className="mb-3">
          <label htmlFor="transactionID" className="form-label">Transaction ID</label>
          <input
            type="text"
            className="form-control"
            id="transactionID"
            name="transactionID"
            value={transactionData.transactionID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userID" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userID"
            name="userID"
            value={transactionData.userID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={transactionData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="borrowedBook" className="form-label">Borrowed Book</label>
          <input
            type="text"
            className="form-control"
            id="borrowedBook"
            name="borrowedBook"
            value={transactionData.borrowedBook}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="returnDate" className="form-label">Return Date</label>
          <input
            type="date"
            className="form-control"
            id="returnDate"
            name="returnDate"
            value={transactionData.returnDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={transactionData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            {/* Add more status options if needed */}
          </select>
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
