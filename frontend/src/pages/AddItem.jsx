import { Box, Button, TextField } from "@mui/material";
import { Formik, useField } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ROUTES } from "../route";

const AddItem = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  async function submitFormData(data) {
    try {
      const response = await axios.post(API_ROUTES.clothingItems, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Succeed! Added a User");

      // Handle the result as needed
      return response.data;
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      throw new Error(error.message);
    }
  }

  async function handleFormSubmit(values) {
    const formattedValues = {
      user_id: values.user_id,
      category: values.category,
      brand: values.brand,
      color: values.color,
      number: values.number,
      price: values.price,
      description: values.description,
    };

    try {
      // Submit the formatted data
      await submitFormData(formattedValues);

      console.log("User created successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error.message);

      if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("for key 'user.username'")
      ) {
        // Show a notification for the duplicate username
        showNotification(
          "Username is already taken. Please choose a different one."
        );
      } else if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("for key 'user.email'")
      ) {
        // Show a notification for the duplicate email
        showNotification(
          "Email is already taken. Please choose a different one."
        );
      }
    }
    navigate("/clothing-item");
  }

  // Example showNotification function (replace with your actual implementation)
  function showNotification(message) {
    // Replace this with code to display a notification (e.g., using a library or a custom solution)
    window.alert(message);
  }

  return (
    <Box m="20px">
      <Header title="ADD ITEM" subtitle="Create a new Clothing Item" />

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
          <form onSubmit={handleSubmit}>
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
                type="number"
                label="User ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user_id}
                name="user_id"
                error={!!touched.user_id && !!errors.user_id}
                helperText={touched.user_id && errors.user_id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                error={!!touched.brand && !!errors.brand}
                helperText={touched.brand && errors.brand}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.color}
                name="color"
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Size"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.size}
                name="size"
                error={!!touched.size && !!errors.size}
                helperText={touched.size && errors.size}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Item
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  userid: yup.number().required("required"),
  category: yup.string().required("required"),
  brand: yup.string().required("required"),
});
const initialValues = {
  user_id: null,
  category: "",
  brand: "",
  color: "",
  number: "",
  price: "",
  description: "",
};

export default AddItem;
