import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AdHomePage from './components/AdHomePage';
import UserProfile from './components/UserProfile';
import AdUserList from './components/AdUserList';
import Books from './components/Books';
import BookList from './components/BookList';
import BooksCategories from './components/BooksCategories';
import Categories from './components/Categories';
import CategoryList from './components/CategoryList';
import Transactions from './components/Transactions';
import TransactionList from './components/TransactionList';
import AddBook from './components/AddBook';
import AddCategory from './components/AddCategory';
import AddTransaction from './components/AddTransaction';


function App() {
  const [userType, setUserType] = useState(null); // Initialize userType as null

  useEffect(() => {
    // Fetch user type from your authentication system and update state accordingly
    const fetchedUserType = localStorage.getItem('userType');
    setUserType(fetchedUserType);
  }, []);

  const isLoggedIn = !!userType; // Check for userType existence to determine login status

  return (
    <Router>
      <div className="App">
        <Header userType={userType} />

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? (userType === 'Admin' ? <Navigate to="/AdHomePage" /> : <Navigate to="/UserProfile" />) : <Navigate to="/Login" />}
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login setUserType={setUserType} />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AdHomePage" element={<AdHomePage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/AdUserList" element={<AdUserList />} />
          <Route path="/Books" element={<Books />} />
          <Route path= "/BookList" element={<BookList />} />
          <Route path="/BooksCategories" element={<BooksCategories />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/CategoryList" element={<CategoryList />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/TransactionList" element={<TransactionList />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="AddTransaction" element={<AddTransaction />} />
          

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
