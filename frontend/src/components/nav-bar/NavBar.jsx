import React, { useState } from "react"
import "./NavBar.css"
import Head from "../head/Head"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";


const NavBar = ({ dark, setMode }) => {
  // Toogle Menu
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <section className='header'>
        <Head dark={dark} setMode={setMode} />
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
                <Link to='/sale' className='navIcon'>
                  <AttachMoneyIcon className='navIcon active' />
                  Sale
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




