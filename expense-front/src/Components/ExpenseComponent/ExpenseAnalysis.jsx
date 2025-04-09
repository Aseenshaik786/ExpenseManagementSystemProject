import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getExpensesReportByCustomer } from "../../Services/ExpenseService";
import "../../LoginView.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseAnalysis = () => {
    let navigate = useNavigate();
    const [customerExpenses, setCustomerExpenses] = useState([]);

    const setCustomerExpenseData = () => {
        getExpensesReportByCustomer()
            .then((response) => {
                console.log("Expense API Response:", response.data); // Debugging
                setCustomerExpenses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching expense data:", error);
            });
    };

    useEffect(() => {
        setCustomerExpenseData();
    }, []);

    const returnBack = () => {
        navigate("/CustomerMenu");
    };

    // Prepare data for Pie Chart
    const chartData = {
        labels: customerExpenses.map((expense) => expense.category), // Assuming 'category' exists
        datasets: [
            {
                label: "Expense Amount",
                data: customerExpenses.map((expense) => expense.amount), // Assuming 'amount' exists
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <div className="expense-analysis-container">
            <h2 style={{ color: "green" }}>Expense Analysis - Pie Chart</h2>
            {customerExpenses.length > 0 ? (
                <div style={{ width: "50%", margin: "auto" }}>
                    <Pie data={chartData} />
                </div>
            ) : (
                <p>No expense data available.</p>
            )}
            <button onClick={returnBack}>Return to Menu</button>
        </div>
    );
};

export default ExpenseAnalysis;