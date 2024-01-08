import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [UserType, setUserType] = useState('');
    const [SecretKey, setSecretKey] = useState('');
    const navigate = useNavigate();
    
    function sendSignUP(e){

      if(UserType==='Admin' && SecretKey!=='admin'){
        e.preventDefault();
        alert('Invalid Admin!')
      }else{
        
        e.preventDefault();
        const newUser={
            FullName,
            Email,
            Phone,
            Address,
            Password,
            UserType
        }

        axios.post("http://localhost:8070/user/create",newUser).then(()=>{
             alert("User Added!")

            setFullName(null);
            setEmail(null);
            setPhone(null);
            setAddress(null);
            setPassword(null);
            setUserType(null);

            navigate('/Login');


    }).catch((err)=>{
            alert(err)
        }) 

      }



        
    }



  return (
    
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded'>

                <h2 className='text-center mb-4'>Sign Up</h2>

        <form onSubmit={sendSignUP}>
        

        <div>
          Register As:
          <input
          type='radio'
          name='UserType'
          value='User'
          onChange={ (e)=> setUserType(e.target.value) }
          />
          User

          <input
          type='radio'
          name='UserType'
          value='Admin'
          onChange={ (e)=> setUserType(e.target.value) }
          />
          Admin
        </div>

       
        {UserType==='Admin'? (
                <div className="mb-3">
                <label>Secret Key</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Secret Key"
      
                  onChange= {(e)=>
                      setSecretKey(e.target.value)}
                  
                />
                </div>
                ):null}


        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"

            onChange= {(e)=>{
                setFullName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"

            onChange= {(e)=>{
                setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input 
           type="text" 
           className="form-control" 
           placeholder="Phone Number"
          
          onChange= {(e)=>{
            setPhone(e.target.value);
          }}
        />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input type="int" 
          className="form-control" 
          placeholder="Address"
          
          onChange= {(e)=>{
            setAddress(e.target.value);
        }}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"

            onChange= {(e)=>{
                setPassword(e.target.value);
            }}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered! <a href="/Login">Login?</a>
        </p>
      </form>
      </div>
      </div>
      
   
  )
}
