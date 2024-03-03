import { Box, Button, TextField  } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, useField } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES } from "../route";

const AddUser = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  async function submitFormData(data) {
    try {
      const response = await axios.post(API_ROUTES.createUser, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Succeed! Added a User');
  
      // Handle the result as needed
      return response.data;
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw new Error(error.message);
    }
  }

  async function handleFormSubmit(values) {
    
    const formattedValues = {
      username: values.username,
      email: values.email,
      password: values.password,
      profile_picture: values.profile_picture,
      bio: values.bio,
      gender: values.gender,
      dob: values.dob,
    };
  
    try {
      // Submit the formatted data
      await submitFormData(formattedValues);
      console.log('User created successfully!');
  
 
    } catch (error) {
      console.error('Error submitting form data:', error.message);
  
      if (error.message.includes("Duplicate entry") && error.message.includes("for key 'user.username'")) {
        // Show a notification for the duplicate username
        showNotification('Username is already taken. Please choose a different one.');
      } else if (error.message.includes("Duplicate entry") && error.message.includes("for key 'user.email'")) {
        // Show a notification for the duplicate email
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
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
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
                sx={{gridColumn: "span 1" }}
              />
              <Select
                fullWidth
                variant="filled"
                onBlur={handleBlur}
                id="demo-simple-select"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 1" }}
                value={values.gender}
                name="gender"
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female' s>Famale</MenuItem>
                <MenuItem value='not above'>Not Above</MenuItem>
              </Select>   
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tell people about you ..."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bio}
                name="bio"
                error={!!touched.bio && !!errors.bio}
                helperText={touched.bio && errors.bio}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth YYYY-MM-DD"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 4" }}
              />

              
           
             
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
  );
};



const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  dob: yup.date().required('Date of Birth is required')

});
const initialValues = {
  username: "",
  password: "",
  email: "",
  bio:"",
  gender:"male",
  dob:""
  
};

export default AddUser;