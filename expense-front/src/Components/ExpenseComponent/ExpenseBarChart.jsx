import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import ExpensePieChart from "./ExpensePieChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpenseBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Amount Spent per Category",
        data: [],
        backgroundColor: [
          "#00bcd4",
          "#7c4dff",
          "#ffab00",
          "#64dd17",
          "#18ffff",
          "#2979ff",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    if (!startDate || !endDate) return;

    fetch(`http://localhost:9797/exp-mng/expense-total-range?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setChartData({
          labels: data.map(([categoryId]) => `Category ${categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent per Category",
              data: data.map(([_, totalAmount]) => totalAmount),
              backgroundColor: [
                "#00bcd4",
                "#7c4dff",
                "#ffab00",
                "#64dd17",
                "#18ffff",
                "#2979ff",
              ],
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          color: "#fff",
        }}
      >
        {/* Pie Chart */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#ffffff" }}>Total Expense by Category</h2>
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <ExpensePieChart />
          </div>
        </div>

        {/* Bar Chart */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#ffffff" }}>Expense Report by Date Range</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
              }}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
              }}
            />
            <button
              onClick={fetchData}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor: "#00bcd4",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Fetch Data
            </button>
          </div>
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: "#ffffff",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#ffffff",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBarChart;