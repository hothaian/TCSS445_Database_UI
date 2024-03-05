import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../../route";
import { Box } from "@mui/material";
import Header from "../Header";

const BarChartOrder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.getTopBuyersByTotalSpent);
        setData(response.data.topBuyers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const buyerIds = data.map((buyer) => buyer.buyer_id);
  const totalSpent = data.map((buyer) => buyer.total_spent);

  const chartData = {
    labels: buyerIds,
    datasets: [
      {
        label: "Total Spent",
        data: totalSpent,
        backgroundColor: "rgba(75,192,192,0.6)", // Adjust color as needed
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Buyer ID",
          color: "white", // Set the color of the x-axis title text
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "white", // Set the color of the x-axis ticks
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Spent",
          color: "white", // Set the color of the y-axis title text
        },
        ticks: {
          color: "white", // Set the color of the y-axis ticks
          callback: (value) => `$${value.toFixed(2)}`, // Add dollar sign and format to two decimal places
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Top Buyers by Total Spent",
        color: "white", // Set the color of the chart title text
        font: {
          size: 30,
          weight: "bold",
        },
      },
      legend: {
        labels: {
          color: "white", // Set the color of the legend labels
        },
      },
    },
  };

  return (
    <div className="cardBox">
      <Box>
        <Header title="Buyer Report " subtitle="Show analytical on Buyers " />
        <Bar data={chartData} options={options} />
      </Box>
    </div>
  );
};

export default BarChartOrder;
