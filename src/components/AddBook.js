import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Books from './Books';

const AddBook = () => {
  // ... other code

  // State for the create book form
  const [createBookFormData, setCreateBookFormData] = useState({
    bookName: '',
    categoryName: '', // Assuming category is a dropdown or similar
    status: 'Available', // Assuming status has a default value
  });

  const navigate = useNavigate();

  // Handle form submission
  const handleCreateBookSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/api/books', createBookFormData); // Adjust the URL

      console.log('Response:', response.data);

      if (response.status === 200) {
        alert("Book Added!")


        // Clear form fields, display success message, and fetch books again
        setCreateBookFormData({ bookName: '', categoryName: '', status: 'Available' });
        // Fetch books to display the newly added book
        //fetchBooks();

        navigate('/Books');

      } else {
        // Handle error
        console.error('Error creating book:', response.data && response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Display generic error message
    }
  };

  return (


    
    <div>
      <h3>Create New Book</h3>
      <form onSubmit={handleCreateBookSubmit}>
        <div className="mb-3">
          <label htmlFor="bookName">Book Name</label>
          <input
            type="text"
            id="bookName"
            className="form-control"
            value={createBookFormData.bookName}
            onChange={(e) => setCreateBookFormData({ ...createBookFormData, bookName: e.target.value })}
          />
        </div>
        {/* Category dropdown with the added options */}
        <div className="mb-3">
          <label htmlFor="categoryName">Category</label>
          <select
            id="categoryName"
            className="form-control"
            value={createBookFormData.categoryName}
            onChange={(e) => setCreateBookFormData({ ...createBookFormData, categoryName: e.target.value })}
          >
            <option value="All">All Categories</option>
            <option value="Novels">Novels</option>
            <option value="Education">Education</option>
            <option value="Academic Journals">Academic Journals</option>
            <option value="Business and Economics">Business and Economics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering and Technology">Engineering and Technology</option>
          </select>
        </div>
        {/* Assuming status is a dropdown or similar */}
        <div className="mb-3 ">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-control"
            value={createBookFormData.status}
            onChange={(e) => setCreateBookFormData({ ...createBookFormData, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>

        <div className="mb-3 text-center"> 
        <button type="submit" className="btn btn-primary" >
          Create Book
        </button>
        </div>
        
      </form>
      </div>



  );
};

export default AddBook;