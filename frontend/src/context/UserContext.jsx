// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const loginUser = (email, password) => {
    // Your authentication logic here
    setLoggedInUser(email);
  };

  const logoutUser = () => {
    // Clear the logged-in user state
    setLoggedInUser(null);
    // Perform any additional cleanup or logout actions
  };

  return (
    <UserContext.Provider value={{ loggedInUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
