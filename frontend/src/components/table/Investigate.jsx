import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme} from '@mui/material';
import { tokens } from "../../theme";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Header from '../Header';
const Investigation = () => {
  const [reportId, setReportId] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    setReportId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/analytical/investigate/${reportId}`);
      setReportData(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching report data. Please try again.');
    }
  };

  const handleShowAll = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/analytical/reported-sellers"
      );
      setReportData(response.data);
      setError(null);
    } catch (error) {
      setError(
        `Error fetching all orders: ${error.message}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'seller_id', headerName: 'Seller ID', flex: 0.5 },
    { field: 'item_id', headerName: 'Item ID', flex: 0.4 },  
    { field: 'price', headerName: 'Price', flex: 0.5 },
    { field: 'description', headerName: 'Description', flex: 0.5 },
    { field: 'review_id', headerName: 'Review ID', flex: 1 },
    { field: 'review_text', headerName: 'Review Text', flex: 3 },
    { field: 'order_status', headerName: 'Order Status', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Reported Sellers List"
          subtitle="write some thing here ..."
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Getting Reports..." : "Get Reports"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleShowAll}
            disabled={loading}
          >
            {loading ? "Fetching All..." : "Show All"}
          </Button>
        </Box>
      </Box>
      <TextField
        label="Seller ID"
        variant="outlined"
        value={reportId}
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
      {error && <Typography color="error" style={{ marginTop: '1rem' }}>{error}</Typography>}
      <Box m="40px 0 0 0"
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
            }}>
        <DataGrid
          rows={reportData}
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

export default Investigation;
