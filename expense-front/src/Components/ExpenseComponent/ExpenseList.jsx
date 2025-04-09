import React, { useEffect, useState } from "react";
import { getAllExpenses } from "../../Services/ExpenseService";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllExpenses()
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div
      className="register-background"
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <div
        className="container card p-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "gold" }}>
          All Expenses
        </h2>
        <table className="table table-hover table-bordered table-dark text-center">
          <thead>
            <tr>
              <th>Expense Number</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Customer ID</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.expenseNumber}</td>
                <td>{expense.categoryId}</td> {/* Just displayed, not editable */}
                <td>{expense.expenseDate}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.customerId}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      navigate(`/update-expense/${expense.expenseNumber}`)
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
