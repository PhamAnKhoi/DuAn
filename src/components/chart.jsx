import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CourseSalesChart = ({
  label,
  data,
  type = "bar",
  bg = "rgba(75, 192, 192, 0.2)",
  border = "rgba(75, 192, 192, 1)",
  margin = "mb-2",
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const drawChart = () => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const labels = data.map((item) => item.keys);
      const sales = data.map((item) => item.values);

      const ctx = chartRef.current.getContext("2d");
      chartRef.current.chart = new Chart(ctx, {
        type: type,
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: sales,
            //   barPercentage: 0.5,
            //   barThickness: 30,
            //   maxBarThickness: 30,
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            
          },
          animations: {
            tension: {
              duration: 1500,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
        },
      });
    }
  };

  return (
    <div className={margin}>
      <canvas
        ref={chartRef}
        id="courseSalesChart"
        width="400"
        height="200"
      ></canvas>
    </div>
  );
};

export default CourseSalesChart;
