import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/transactions');
        console.log('Fetch URL:', 'http://localhost:8070/api/books');
        console.log('Response:', response.data);


        setTransactions(response.data);


      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);



      // Function to navigate to the category adding page
      const redirectToUserProfile = () => {
        navigate('/UserProfile'); // Adjust the path based on your route
        };



  return (


    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className="auth-wrapper container" style={{ height: "auto" }}>
    <div className="auth-inner container-fluid">



    <div>

    <center>
    <h3 style={{ color: 'white', textShadow: '2px 2px 2px black' }}>Manage Books</h3>
    </center>

    <table className="table table-bordered" style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
        <thead className="bg-primary text-white">
          <tr>
            <th>Transaction ID</th>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Borrowed Book</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionID}>
              <td>{transaction.transactionID}</td>
              <td>{transaction.userID}</td>
              <td>{transaction.fullName}</td>
              <td>{transaction.borrowedBook}</td>
              <td>{transaction.returnDate}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
    <div className="mb-3 text-end">
    <button onClick={redirectToUserProfile} className="btn btn-secondary">
    User Profile
    </button>
    </div>


    </div>
    </div>
    </div>


  );
};

export default Transactions;
