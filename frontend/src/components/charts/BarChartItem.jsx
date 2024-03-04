import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  // Sample data
  const data = {
    labels: ['Order 1', 'Order 2', 'Order 3', 'Order 4', 'Order 5'],
    datasets: [
      {
        label: 'Total Order',
        yAxisID: 'left-axis',
        data: [30, 50, 20, 40, 60],
        backgroundColor: 'rgba(75,192,192,0.6)',
        barPercentage: 0.4, // Adjust the width of the bars
        categoryPercentage: 0.5, // Adjust the gap between groups
      },
      {
        label: 'Total Like',
        yAxisID: 'right-axis',
        data: [10, 25, 15, 30, 20],
        backgroundColor: 'rgba(255,99,132,0.6)',
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'left-axis',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'right-axis',
          grid: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartItem;