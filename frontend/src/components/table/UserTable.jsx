import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../route";

const ClothingTable = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columnName = [
    "id",
    "username",
    "email",
    "password",
    "bio",
    "gender",
    "dob",
    "profile_picture",
  ];

  const columns = columnName.map((field) => ({
    field,
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    flex: 0,
  }));

  //CUSTOM COLUMN  ATTRIBUTES HERE
  columns[columns.findIndex((column) => column.field === "bio")].flex = 1;

  const handleDeleteUser = async (userId) => {
    try {
      // Send a request to delete the user by ID
      await axios.delete(API_ROUTES.deleteUser, userId);

      // Update the user data by fetching the latest data
      const response = await axios.get(API_ROUTES.users);
      setUserData(response.data);

      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = async (userId) => {
    // Do any processing you need with userId

    // Redirect to /edituser with userID as a parameter
    navigate(`/edit-user/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.users);
        console.log("🚀 ~ fetchData ~ response:", response.data);

        setUserData(formatData(response.data));
        console.log("🚀 ~ fetchData ~ UserData:", userData);
        if (response.data.length === 0) {
          console.log("Received an empty array from the server.");
        } else {
          console.log("Get the User Table Succeed !");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatData = (data) => {
    // Map through the data and format each row based on the provided columnName
    return data.map((user) => {
      const formattedRow = {};
      columnName.forEach((column) => {
        formattedRow[column] = user[column];
      });
      //CHANGE FIRST ROW TO PRIMARY KEY NAME
      formattedRow.id = user.user_id;
      return formattedRow;
    });
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User Table" subtitle="Managing all users" />
        <Button variant="contained" component={Link} to="/add-user">
          Add User
        </Button>
      </Box>

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
          checkboxSelection
          rows={userData}
          columns={columns}
          selectionModel={selectedUsers}
          onSelectionModelChange={(newSelection) =>
            setSelectedUsers(newSelection.selectionModel)
          }
        />
      </Box>
    </Box>
  );
};

export default ClothingTable;
