import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  // State for the create category form
  const [createCategoryFormData, setCreateCategoryFormData] = useState({
    categoryName: '',
    categoryDescription: ''

  });

  const navigate = useNavigate();

  // Handle form submission
  const handleCreateCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/api/categories', createCategoryFormData); // Adjust the URL

      console.log('Response:', response.data); // Log the entire response for debugging

      if (response.status === 200) {
        alert('Category Added!');

        // Clear form fields, display success message, and navigate to the Books page
        setCreateCategoryFormData({ categoryName: '', categoryDescription: ''});

        navigate('/Categories');
      } else {
        // Handle error
        console.error('Error creating category:', response.data && response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Display generic error message
    }
  };

  return (

    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded'>


    <div>
      <h3>New Category</h3>
      <form onSubmit={handleCreateCategorySubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            className="form-control"
            value={createCategoryFormData.categoryName}
            onChange={(e) =>
              setCreateCategoryFormData({
                ...createCategoryFormData,
                categoryName: e.target.value,
              })
            }
          />
        </div>


        
                    {/* Added description input */}
                    <div className="mb-3">
              <label htmlFor="categoryDescription" className="form-label">
                Category Description
              </label>
              <textarea
                id="categoryDescription"
                className="form-control"
                value={createCategoryFormData.categoryDescription}
                onChange={(e) =>
                  setCreateCategoryFormData({
                    ...createCategoryFormData,
                    categoryDescription: e.target.value,
                  })
                }
              />
            </div>



        <div className="mb-3 text-center">
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
        </div>

      </form>
    </div>


    </div>
    </div>

  );
};

export default AddCategory;
