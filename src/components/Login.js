import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AdHomePage from './AdHomePage';
import HomePage from './HomePage';



const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/user/Login', {
        Email: Email,
        Password: Password
      });

      const result = response.data;

      if (result.status === 'User Logged in') {
        // Store the token in localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('Loggedin', 'true');
        localStorage.setItem('userType', result.userType); // Assuming you receive user type from the server

        // Additional logic for handling user details or redirects can go here

                // Redirect based on user type
                if (result.userType === 'Admin') {
                  setAdmin(true);
                  navigate('/AdHomePage');
              } 
              else {
                  navigate('/HomePage');
              }

              

      }

    } catch (err) {
      console.error(err);
      // Handle login failure, show error message, etc.
    }
  };

        
    
        



  return (

    
    
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded'>

    <h2 className='text-center mb-4'>Login</h2>

      <form onSubmit={sendLogin}>
        
        
        <div className="mb-3">
          
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"

            onChange= {(e)=>{
                setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"

            onChange= {(e)=>{
                setPassword(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Not Registered!  <a href="SignUp">Sign-Up?</a>
        </p>
      </form>
      </div>
      </div>

    
      


  )
}


export default Login;