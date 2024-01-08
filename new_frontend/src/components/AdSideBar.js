import React from 'react'
import { useLocation } from 'react-router-dom';
import AdUserList from './AdUserList';



import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
  


export default function SideBar() {



  const location = useLocation();



  return (

    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          Sidebar
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
             exact 
             to="/AdUserList"
             
             activeClassName="activeClicked"
             
             >
              <CDBSidebarMenuItem icon="user">UserProfile</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 5px',
          }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>

    

  </div>
    
  )
}
