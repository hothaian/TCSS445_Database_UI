import React, { useState } from "react"
import "./NavBar.css"

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportIcon from '@mui/icons-material/Report';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import ReviewsIcon from '@mui/icons-material/Reviews';
import PendingIcon from '@mui/icons-material/Pending';

const NavBar = ({ dark, setMode }) => {
  // Toogle Menu
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <section className='header'>
       
        <header>
          <div className='container'>
            {/*<ul className='navMenu'>*/}
            <ul className={Mobile ? "navMenu-list" : "link"} onClick={() => setMobile(false)}>
              <li>
                <Link to='/' className='navIcon'>
                  <DashboardOutlinedIcon className='navIcon active' />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/user' className='navIcon'>
                  <PersonOutlineIcon className='navIcon active' />
                  User Board
                </Link>
              </li>
              <li>
                <Link to='/clothing-item' className='navIcon'>
                  <InventoryIcon className='navIcon active' />
                  Clothing Item
                </Link>
              </li>
              <li>
                <Link to='/add-user' className='navIcon'>
                  <PersonAddIcon className='navIcon active' />
                  Add User
                </Link>
              </li>
              <li>
                <Link to='/add-item' className='navIcon'>
                  <AddCircleIcon className='navIcon active' />
                  Add Item
                </Link>
              </li>

              <li>
                <Link to='/pending-order' className='navIcon'>
                  <PendingIcon className='navIcon active' />
                  Pending Order
                </Link>
              </li>
    
              <li>
                <Link to='/review' className='navIcon'>
                  <ReviewsIcon className='navIcon active' />
                  Review
                </Link>
              </li>
              <li>
                <Link to='/report' className='navIcon'>
                  <ReportIcon className='navIcon active' />
                  Investigate Report
                </Link>
              </li>
             
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </section>
    </>
  )
}

export default NavBar




