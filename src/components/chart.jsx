import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";

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
            const values = data.map((item) => item.values);

            const ctx = chartRef.current.getContext("2d");
            chartRef.current.chart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    // datalabels: {
                    //   color: '#FFCE56'
                    // },
                    datasets: [
                        {
                            barThickness: 30,
                            borderRadius: 4,
                            barPercentage: 0.5,
                            maxBarThickness: 50,
                            minBarLength: 2,
                            label: label,
                            data: values,
                            backgroundColor: bg,
                            borderColor: border,
                            borderWidth: 2,
                        },
                    ],
                },
                // plugins: {
                //   ChartDataLabels: {},
                // },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                        x: {
                            ticks: {
                                // display: false, // Hides only the labels of the x-axis
                                callback: function (value) {
                                    // let x_label = str.substring(0, maxLength) + "...";
                                    let x_label = labels[value].length > 20 ? `${labels[value].substring(0, 15)}...` : labels[value];
                                    // console.log(labels[value]);
                                    return x_label; // Truncate label if needed
                                }
                            },
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
