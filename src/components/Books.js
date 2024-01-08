import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch books from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/books'); // Adjust the URL based on your backend route
        console.log('Fetch URL:', 'http://localhost:8070/api/books');
        console.log('Response:', response.data);
        
        
        setBooks(response.data);
        

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);


    // Function to update a book
    const updateBook = (bookId) => {
      // Implement logic to navigate to the update book page or show a modal
      console.log(`Updating book with ID: ${bookId}`);
    };
  
    
// Function to delete a book
const deleteBook = (bookId, bookName) => {
  if (window.confirm(`Are you sure you want to delete ${bookName}?`)) {
    fetch('http://localhost:8070/api/delbooks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Ok") {
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); // Filter out deleted book
          alert(`Book ${data.data.bookName} deleted successfully`); // Alert success message
        } else {
          console.error('Error deleting book:', data.error);
          alert('Error deleting book. Please try again.'); // Alert error message
        }
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        alert('Something went wrong. Please try again.'); // Alert generic error message
      });
  }
};



    // Function to navigate to the category adding page
    const redirectToCategoryAddingPage = () => {
    navigate('/AddCategory'); // Adjust the path based on your route
    };



  return (

    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className="auth-wrapper container" style={{ height: "auto" }}>
    <div className="auth-inner container-fluid">

    <center>
    <h3 style={{ color: 'white', textShadow: '2px 2px 2px black' }}>Manage Books</h3>
    </center>
      {/* Display books data in a table */}

      
      <table className="table table-bordered" style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
        {/* Table header */}
        <thead className="bg-primary text-white">
          <tr>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
    

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

              <td>
                  <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => updateBook(book._id)}
                  />
              </td>

              <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteBook(book._id, book.FullName)}
                  />
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      
    
      
      <div className="mb-3 text-end"> 
      {/* Button to redirect to category adding page */}
      <button onClick={redirectToCategoryAddingPage} className="btn btn-secondary">
      Add Category
      </button>
      </div>







    </div>
    </div>
    </div>
    

  );
};

export default Books;
