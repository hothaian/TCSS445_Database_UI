import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChartItem = () => {
  const [tagCounts, setTagCounts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint using Axios
    axios
      .get("http://localhost:8080/api/analytical/popular-tag")
      .then((response) => {
        const { tagCounts } = response.data;
        setTagCounts(tagCounts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const data = {
    labels: tagCounts.map((tag) => tag.tag_name),
    datasets: [
      {
        label: "Tag Count",
        data: tagCounts.map((tag) => tag.tag_count),
        backgroundColor: "rgba(173,216,230,0.8)", // Light blue background color
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Tag Name",
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
          text: "Count",
          color: "white", // Set the color of the y-axis title text
        },
        ticks: {
          precision: 0,
          color: "white", // Set the color of the y-axis ticks
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Most Popular Tags in Orders",
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
    <div>
      <div className="cardBox">
        <Box m="10px">
          <Header title="Order Report " subtitle="Show analytical on Orders " />
          <Bar data={data} options={options} />
        </Box>
      </div>
    </div>
  );
};

export default BarChartItem;
