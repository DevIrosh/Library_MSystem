import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8070/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); // Run once on component mount

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter books based on search term and selected category
  const filteredBooks = books.filter((book) => {
    const matchSearchTerm = book.bookName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || book.categoryName === selectedCategory;
    return matchSearchTerm && matchCategory;
  });

  return (
    <div>
      <h2>Book List</h2>
      <input type="text" placeholder="Search by book name" value={searchTerm} onChange={handleSearch} />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        <option value="Novels">Novels</option>
        <option value="Education">Education</option>
        <option value="Academic Journals">Academic Journals</option>
        <option value="Business and Economics">Business and Economics</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Engineering and Technology">Engineering and Technology</option>
      </select>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book._id}>
            {book.bookName} - {book.status}
            {/* Add a button or link to handle the transaction */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
