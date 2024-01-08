import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    FullName: '',
    Email: '',
    Phone: '',   // Added phone field
    Address: '', // Added address field
    // Add other user details as needed
  });


  const navigate = useNavigate();

  // Default profile picture URL
  const defaultProfilePic = process.env.PUBLIC_URL + '/default-profile-pic.png';

  useEffect(() => {
    // Fetch user details from the server after the component mounts
    const fetchUserDetails = async () => {

      try {
        const token = window.localStorage.getItem('token'); // Assuming you store the token in local storage after login
        console.log('Token:', token);

        if (token) {
          const response = await axios.get('http://localhost:8070/user/UserProfile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User Profile Response:', response.data);

          setUserDetails(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        // Handle error fetching user details
      }

    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this effect runs once after the initial render


  const Logout = () => {
    try {
      // Perform logout logic here, e.g., remove the token from local storage
      window.localStorage.removeItem('token');
      // Redirect to the login page or any other desired page
      navigate('/Login');
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Handle error during logout
    }
  };


  return (

<div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
  <div className='bg-white p-3 rounded'>

    <div className="container mt-5 text-center">
      <h2>User Profile</h2>
      <div className="mb-3">
        {/* Display default profile picture */}
        <img src={defaultProfilePic} alt="Default Profile" className="img-thumbnail mb-3" style={{ width: '150px', height: '150px', margin: '0 auto' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" value={userDetails.FullName} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" value={userDetails.Email} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input type="text" className="form-control" id="phone" value={userDetails.Phone} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input type="text" className="form-control" id="address" value={userDetails.Address} readOnly />
      </div>

      <button className="btn btn-danger" onClick={Logout} style={{ display: 'block', margin: '0 auto' }}>
        Logout
      </button>
    </div>

  </div>
</div>



  );
}