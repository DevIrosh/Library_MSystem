import React, { useState } from 'react';
import Header from './Header'
import { Space } from 'antd'
import SideBar from './SideBar'
import Footer from './Footer'
import UserProfile from './UserProfile'
import AddTransaction from './AddTransaction';



export default function HomePage() {




  return (
    <div>

     
      
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded'>

      
      
            <AddTransaction/>
      

            </div>
            </div>
        
      
      
      
    </div>
  );
}
