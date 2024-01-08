import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function AdUserList({ userData }) {

  //setting state
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message






  // Fetching all user data when the component mounts
  useEffect(() => {
    getAllUser();
  }, []);

  // Function to fetch user data
  const getAllUser = async () => {
    try {
      const response = await fetch("http://localhost:8070/user/getAllUser", {
        method: "GET",
      });
      const fetchedData = await response.json();

      // Adjust the path if necessary based on API response structure
      setData(fetchedData.data); // Assuming data is within "data" property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



//logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./Login";
  };


  // Function to delete a user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:8070/user/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin":
 
"*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Ok") {
            setData(data => data.filter(user => user._id !== id)); // Filter out deleted user
            setSuccessMessage(`User ${data.data.name} deleted successfully`); // Set success message
          } else {
            setError(data.error); // Set error message
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setError("Something went wrong, please try again"); // Set generic error message
        });
    }
  };

   

  



  

  return (


<div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
  <div className="auth-wrapper container" style={{ height: "auto" }}>
    <div className="auth-inner container-fluid">
          <center>
            <h3 style={{ color: 'white', textShadow: '2px 2px 2px black' }}>Manage Categories</h3>
          </center>

      {data.length > 0 ? (
        <table className="table table-bordered" style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
          <thead className="bg-primary text-white">
            <tr>
              <th>FullName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>User Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i._id}>
                <td>{i.FullName}</td>
                <td>{i.Email}</td>
                <td>{i.Phone}</td>
                <td>{i.Address}</td>
                <td>{i.UserType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.FullName)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="mb-3 text-center">
      <button onClick={logOut} className="btn btn-danger">
        Log Out
      </button>
      </div>

    </div>
  </div>
</div>




    

  );
}

