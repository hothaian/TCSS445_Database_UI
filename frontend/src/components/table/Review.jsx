import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../theme";
import Header from "../Header";

const ReviewFormItem = () => {
  const [itemId, setItemId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleChange = (e) => {
    setItemId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/scenarios/review/${itemId}`
      );
      setReviews(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching reviews. Please try again.");
    }
  };

  const columns = [
    { field: "review_id", headerName: "Review ID", flex: 0.5 },
    { field: "user_id", headerName: "User ID", flex: 0.5 },
    { field: "item_id", headerName: "Item ID", flex: 0.5 },
    { field: "text", headerName: "Review Text", flex: 4 },
    { field: "date_posted", headerName: "Date Posted", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Get Review from Seller"
          subtitle="write some thing here ..."
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Get Reviews
        </Button>
      </Box>
      <TextField
        label="Seller ID"
        variant="outlined"
        value={itemId}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
        style={{ marginTop: "1rem" }}
      />
      {error && (
        <Typography color="error" style={{ marginTop: "1rem" }}>
          {error}
        </Typography>
      )}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={5}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          disableDensitySelector
          getRowId={(row) => row.review_id}
        />
      </Box>
    </Box>
  );
};

export default ReviewFormItem;
