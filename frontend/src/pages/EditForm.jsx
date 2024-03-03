import { Box, Button, TextField  } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, useField } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate, useHisto } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditUser = (userID) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      age: "",
      access: "",
    });
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1234/users/all");
        setUserData(response.data);
  
        if (response.data.length === 0) {
          console.log("Received an empty array from the server.");
        } else {
          console.log("Get the User Table Succeed !");
          
          // Assuming response.data is an array of user objects
          if (response.data.length > 0) {
            const firstUser = response.data[0]; // You can choose any user or use a specific logic
            
            // Update formValues with data from the first user
            setFormValues({
              firstName: firstUser.firstName || "",
              lastName: firstUser.lastName || "",
              email: firstUser.email || "",
              contact: firstUser.contact || "",
              age: firstUser.age || "",
              access: firstUser.access || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Empty dependency array means the effect runs once when the component mountss



  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  async function submitFormData(data) {
    const response = await fetch('http://localhost:1234/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorMessage = await response.text();
        console.error('Error submitting form data:', errorMessage);
        throw new Error(errorMessage);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const result = await response.json();
    console.log('Succeed! Added a User');

    // Handle the result as needed
    return result;
  }

  async function handleFormSubmit(values) {
    const formattedValues = {
      name: values.firstName + ' ' + values.lastName,
      email: values.email,
      age: values.age,
      phone: values.contact,
      access: values.access,
    };
  
    try {
      // Submit the formatted data
      await submitFormData(formattedValues);
      console.log('User created successfully!');
  
 
    } catch (error) {
      console.error('Error submitting form data:', error.message);
  
      if (error.message.includes('Email is already taken')) {
        showNotification('Email is already taken. Please choose a different one.');
      }
    }
    navigate('/user');
  }

// Example showNotification function (replace with your actual implementation)
function showNotification(message) {
    // Replace this with code to display a notification (e.g., using a library or a custom solution)
    window.alert(message);
}




  return ( 
    <div>
        {userID && (
                <Box m="20px">
                <Header title="CREATE USER" subtitle="Create a New User Profile" />
          
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={formValues}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit} >
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& .MuiInputBase-input": { color: "white" }, //input  White
                          "& .MuiInputLabel-root": { color: "white" }, // Change label color to red
                          "& .MuiFormHelperText-root": { color: "red" }, // Change helper text color to blue
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="First Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          name="firstName"
                          error={!!touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Last Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          name="lastName"
                          error={!!touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Contact Number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contact}
                          name="contact"
                          error={!!touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.age}
                          name="age"
                          error={!!touched.age && !!errors.age}
                          helperText={touched.age && errors.age}
                          sx={{ gridColumn: "span 4" }}
                        />
                        
                        <Select
                          defaultValue='user'
                          fullWidth
                          variant="filled"
                          onBlur={handleBlur}
                          id="demo-simple-select"
                          error={!!touched.access && !!errors.access}
                          helperText={touched.access && errors.access}
                          sx={{ gridColumn: "span 4" }}
                          value={values.access}
                          name="access"
                          label="Access"
                          onChange={handleChange}
                        >
                          <MenuItem value='admin'>Admin</MenuItem>
                          <MenuItem value='user' s>User</MenuItem>
                          <MenuItem value='manager'>Manager</MenuItem>
                        </Select>              
                       
                      </Box>
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                          Create New User
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
        )}
    </div>

  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.number().required("Age is required").positive("Age must be positive"),
  access: yup.string().required("required"),
});

export default EditUser;