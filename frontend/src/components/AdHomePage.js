import React, { useState } from 'react';
import Header from './Header'
import { Space } from 'antd'
import AdSideBar from './AdSideBar'
import Footer from './Footer'
import AdUserList from './AdUserList';
import AddBook from './AddBook';




export default function AdHomePage() {




  return (
    <div>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded'>

      
      
            <AddBook/>
      

            </div>
            </div>
      
    </div>
  );
}
