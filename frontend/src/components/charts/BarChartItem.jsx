import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import Header from "../Header";
import { API_ROUTES } from "../../route";
import axios from "axios";

const BarChartItem = () => {
  const [mostLikedAndOrderedItems, setMostLikedAndOrderedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(API_ROUTES.getMostLikedAndOrderedItem);
        
        const result = response.data;
        
       
        setMostLikedAndOrderedItems(result.mostLikedAndOrderedItems);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Extracting item_id, TotalLike, and total_orders from the API response
  const labels = mostLikedAndOrderedItems.map((item) => item.item_id.toString());
  const totalLikes = mostLikedAndOrderedItems.map((item) => item.TotalLike);
  const totalOrders = mostLikedAndOrderedItems.map((item) => item.total_orders);
  
  
  // Bar chart data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Like",
        data: totalLikes,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Total Orders",
        data: totalOrders,
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

// Bar chart options
const options = {
  plugins: {
    title: {
      display: true,
      text: "Most liked items and their total order received",
      color: 'white', // Set the color of the title text
      font: {
        size: 16, // Set the font size of the title text
      },
    },
    legend: {
      labels: {
        color: 'white', // Set the color of the legend labels
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Item Id",
        color: 'white', // Set the color of the x-axis title
      },
      grid: {
        display: false,
      },
      ticks: {
        color: 'white', // Set the color of the x-axis ticks
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: 'white', // Set the color of the y-axis ticks
        precision: 0, // Set the precision to 0 to display only whole integers
      },
      title: {
        display: true,
        text: "Count",
        color: 'white', // Set the color of the y-axis title
      },
    },
  },
  defaultColor: 'white', // Set the default color for all other text
};


  return (
    <div>
      <div className="cardBox">
        <Box m="10px">
          <Header
            title="Item Report "
            subtitle="Show analytical on Items "
          />
          <Box height="40vh">
            <Bar data={data} options={options} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default BarChartItem;
