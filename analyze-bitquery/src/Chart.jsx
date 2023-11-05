import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !Array.isArray(data)) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous Chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item.height),
        datasets: [
          {
            label: "Transaction Count",
            data: data.map((item) => item.transactionCount),
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
          },
        },
      },
    });
  }, [data]);

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
