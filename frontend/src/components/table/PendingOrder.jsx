import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../theme";

const PendingOrder = () => {
  const [sellerId, setSellerId] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    setSellerId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/analytical/pendingOrder/${sellerId}`
      );
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching orders. Please try again.");
    }
  };

  const columns = [
    { field: "order_id", headerName: "Order ID", flex: 1 },
    { field: "buyer_id", headerName: "Buyer ID", flex: 1 },
    { field: "item_id", headerName: "Item ID", flex: 1 },
    { field: "buyer_username", headerName: "Buyer Username", flex: 1 },
    { field: "buyer_email", headerName: "Buyer Email", flex: 1 },
    { field: "address_line1", headerName: "Address Line 1", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "zip_code", headerName: "Zip Code", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Get Pending Order"
          subtitle="write some thing here ..."
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Get Orders
        </Button>
      </Box>
      <TextField
        label="Seller ID"
        variant="outlined"
        value={sellerId}
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
          rows={orders}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.order_id}
        />
      </Box>
    </Box>
  );
};

export default PendingOrder;
