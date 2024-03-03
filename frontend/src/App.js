import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/nav-bar/NavBar';
import Home from './pages/Home';
import User from './pages/User';
import ClothingItem from './pages/ClothingItem';
import AddUser from './pages/AddUser';
import Sale from './pages/Sale';
import './App.css';
import EditUser from './pages/EditForm';
import AddItem from './pages/AddItem';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/clothing-item" element={<ClothingItem />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/sale" element={<Sale />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;