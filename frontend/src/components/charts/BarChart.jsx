import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import Header from "../Header";
import { API_ROUTES } from "../../route";
import axios from "axios";
import { colors } from '@mui/material';


const BarChart = () => {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
 
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_ROUTES.getItemLikeOrder);
  //       const result = response.data;
  //       console.log("🚀FETCH DATA HERE :", result.data);
  //       setData(result.data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   if (data && Array.isArray(data)) {
  //     // Transform the data
  //     const transformed = data.map((item) => ({
  //       item_id: item.item_id,
  //       TotalLike: item.TotalLike,
  //       total_orders: item.total_orders,
  //     }));
  
  //     setTransformedData(transformed);
  //   }
  // }, [data]);
  useEffect(() => {
    // Mock API response
    const apiResponse = {
      "message": "Top 5 most liked and ordered items",
      "topLikedAndOrderedItems": [
        { "item_id": 1, "TotalLike": 5, "total_orders": 1 },
        { "item_id": 2, "TotalLike": 1, "total_orders": 3 },
        { "item_id": 3, "TotalLike": 1, "total_orders": 1 },
        { "item_id": 4, "TotalLike": 1, "total_orders": 1 },
        { "item_id": 5, "TotalLike": 10, "total_orders": 1 }
      ]
    };

    setData(apiResponse.topLikedAndOrderedItems);
  }, []);

  // Your useEffect for data transformation
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Transform the data
      const transformedData = data.map((item) => ({
        item_id: item.item_id,
        TotalLike: item.TotalLike,
        total_orders: item.total_orders,
      }));

      console.log(transformedData); // Verify the transformed data in the console
    }
  }, [data]);

  

  const fill = [
    {
      match: {
        id: "accessories",
      },
      id: "dots",
    },
    {
      match: {
        id: "clothing",
      },
      id: "lines",
    },
    {
      match: {
        id: "shoes",
      },
      id: "dots",
    },
  ];
  
  return (
    <div>
      <div className="cardBox">
        <Box m="20px">
          <Header
            title="Item Id "
            subtitle="Reporting customer spending and  number of orders"
          />
          <Box height="40vh">
          <ResponsiveBar
      data={data}
      keys={['TotalLike', 'total_orders']}
      indexBy="item_id"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="stack"
      valueScale={{
        type: 'linear',   // Left axis (Total Like)
        min: 0,
        max: 'auto',           // Adjust the maximum as needed
      }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
      }}
      axisTop={null}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Item',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Count',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
                
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Top 5 Liked and Ordered Items Bar Chart"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in Item: ${e.indexValue}`}
    />
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default BarChart;
