// Head.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'; // Adjust the path as needed
import LoginButton from '../LoginButton'; // Adjust the path as needed
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import './Head.css'; // Import your custom styles if needed
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const Head = () => {
  const { loggedInUser, loginUser, logoutUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Add logic to handle logout, such as clearing the loggedInUser in the context
    logoutUser();
  };

  return (
    <div className="head-container">
      <div className="left-corner">
        <h2>An Ho & Tin Phu | CSS 445 - WINTER 445</h2>
        <h2>Online Store Managment </h2>
      </div>
      <div className="right-corner">
        {loggedInUser ? (
          <div className="welcome-container">
          <SentimentSatisfiedAltIcon color="secondary" />
          <p style={{ color: 'white', marginRight: '8px' }}>Welcome, {loggedInUser}!</p>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        ) : (
          <div>
            <p style={{ color: 'white' }}>Please log in</p>
            {/* Use the LoginButton component with the dialog */}
            <LoginButton handleOpen={handleOpen} />
          </div>
        )}
      </div>

      {/* Dialog for Login */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {/* Add any additional login form components if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* You can include actions like "Login" here based on your needs */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Head;
