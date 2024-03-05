import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import axios from 'axios';

const LoginButton = () => {
  const { loginUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage(''); // Clear the error message when closing the dialog
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/scenarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other necessary headers for authentication
        },
        body: JSON.stringify({  // Using body instead of data
          username: username,
          password: password,
        }),
      });
      console.log("🚀 ~ handleLogin ~ response:", response)
     
  
      // Check the response status and message
      if (response.ok) {
        // User found, proceed with the login
        loginUser(username, password);
        handleClose();
      } else {
        // Handle other cases, e.g., invalid credentials or user not found
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        Login
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography variant="body2" color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginButton;
