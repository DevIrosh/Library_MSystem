import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BooksCategories = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  // Fetch categories and books from the backend API
  useEffect(() => {
    const fetchCategoriesAndBooks = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:8070/categories'); // Adjust the URL based on your backend route
        setCategories(categoriesResponse.data);

        // Fetch books
        const booksResponse = await axios.get('http://localhost:8070/books'); // Adjust the URL based on your backend route
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Error fetching categories and books:', error);
      }
    };

    fetchCategoriesAndBooks();
  }, []);

  return (
    <div>
      <h3>Manage Books & Categories</h3>

      {/* Display categories data in a table */}
      <h4>Categories</h4>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Books</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryID}>
              <td>{category.categoryID}</td>
              <td>{category.categoryName}</td>
              <td>{category.books.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display books data in a table */}
      <h4>Books</h4>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Category Name</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.bookID}</td>
              <td>{book.bookName}</td>
              <td>{book.categoryName}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksCategories;
