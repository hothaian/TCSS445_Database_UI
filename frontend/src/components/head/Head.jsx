import React from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"

const Head = ({ dark, setMode }) => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            <div className='logo'>
              <img src='images/logo.png' alt='' />
              <span class="title">Hello</span>
            </div>
          </div>
          <div className='right flexCenter'>
            <div className='search flexCenter'>
              <input type='text' placeholder='Search...' />
              <SearchOutlinedIcon className='iconHead' />
            </div>
            <NotificationsNoneOutlinedIcon className='iconHead' />
            <div className='profile flexCenter'>
              <img className='imageCircle' src='https://i.pinimg.com/originals/5f/ec/95/5fec9590fac5ec934fef792eaf348390.jpg' alt='' />
              <span>An Ho</span>
              <KeyboardArrowDownOutlinedIcon className='iconHead' />
            </div>
            <button onClick={() => setMode(!dark)}>
              <SettingsIcon className='iconHead' />
            </button>
            {/*<button onClick={toggleStyle}>
              <SettingsIcon className='iconHead' />
              {btn}
            </button>*/}
          </div>
        </div>
      </section>
    </>
  )
}

export default Head