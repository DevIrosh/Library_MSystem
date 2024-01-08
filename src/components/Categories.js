import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/categories'); // Adjust the URL based on your backend route
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to update a category
  const updateCategory = (categoryId) => {
    // Implement logic to navigate to the update category page or show a modal
    console.log(`Updating category with ID: ${categoryId}`);
  };

  // Function to delete a category
  const deleteCategory = async (categoryId, categoryName) => {
    try {
      // Implement logic to confirm deletion and then make the delete request
      const confirmDelete = window.confirm(`Are you sure you want to delete ${categoryName}?`);
      
      if (confirmDelete) {
        await axios.delete(`http://localhost:8070/categories/${categoryId}`); // Adjust the URL
        // Fetch categories again after deletion
        const response = await axios.get('http://localhost:8070/categories'); // Adjust the URL
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Function to navigate to the login page
  const logout = () => {
    navigate('/Login'); // Adjust the path based on your route
  };



  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className="auth-wrapper container" style={{ height: "auto" }}>
        <div className="auth-inner container-fluid">
          <center>
            <h3 style={{ color: 'white', textShadow: '2px 2px 2px black' }}>Manage Categories</h3>
          </center>
          {/* Display categories data in a table */}
          <table className="table table-bordered" style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
            {/* Table header */}
            <thead className="bg-primary text-white">
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Category Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryID}>
                  <td>{category.categoryID}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.categoryDescription}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => updateCategory(category._id)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteCategory(category._id, category.categoryName)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          
          <div className="mb-3 text-end">
          <Link to="/AdUserList" className="btn btn-secondary">
            UserDetails
          </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Categories;
