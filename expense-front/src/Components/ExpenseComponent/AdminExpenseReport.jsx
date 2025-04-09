import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllCustomers } from "../../Services/CustomerService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminExpenseReport = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Spent per Category",
        data: [],
        backgroundColor: [
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
        ],
      },
    ],
  });

  useEffect(() => {
    getAllCustomers()
      .then((response) => setCustomerList(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const loadExpenseData = () => {
    if (!selectedCustomerId) return;
    fetch(`http://localhost:9797/exp-mng/summary/${selectedCustomerId}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenseData({
          labels: data.map((item) => `Category ${item.categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent",
              data: data.map((item) => item.totalAmount),
              backgroundColor: [
  "#FF6B6B", // Coral Red
  "#6BCB77", // Mint Green
  "#4D96FF", // Sky Blue
  "#FFD93D", // Golden Yellow
  "#845EC2", // Purple
  "#00C9A7", // Aqua
  "#F9F871", // Soft Yellow
  "#FF9671", // Peach
],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#ffffff",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "700px",
          margin: "auto",
          padding: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 style={{ color: "#4fc3f7", marginBottom: "20px" }}>
          Customer Spending Report
        </h2>

        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "20px",
            backgroundColor: "#263238",
            color: "#ffffff",
          }}
        >
          <option value="">Select Customer</option>
          {customerList.map((customer) => (
            <option key={customer.customerId} value={customer.customerId}>
              {customer.customerName}
            </option>
          ))}
        </select>

        <button
          onClick={loadExpenseData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0277bd",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Generate Report
        </button>

        <div>
          <Bar data={expenseData} />
        </div>
      </div>
    </div>
  );
};

export default AdminExpenseReport;