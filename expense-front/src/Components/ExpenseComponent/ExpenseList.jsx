import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Use correct API for logged-in user's expenses
    axios
      .get("http://localhost:9797/exp-mng/expense-cust")
      .then((response) => setExpenses(response.data || []))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  const handleDelete = (expenseNumber) => {
    axios
      .delete(`http://localhost:9797/exp-mng/expense/delete/${expenseNumber}`)
      .then(() =>
        setExpenses(expenses.filter((exp) => exp.expenseNumber !== expenseNumber))
      )
      .catch((error) => console.error("Error deleting expense:", error));
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          width: "80%",
          backgroundColor: "rgb(50 64 80 / 59%)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          color: "#ecf0f1",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", fontSize: "30px" }}>
          <u>Expense List</u>
        </h2>
        <hr
          style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }}
        />
        <input
          type="text"
          placeholder="Search by description..."
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "20%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            border: "1px solid #ccc",
            padding: "6px",
            borderRadius: "5px",
          }}
        />
        {filteredExpenses.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Expense Number
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Category
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Date
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Description
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.expenseNumber}>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {expense.expenseNumber}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {expense.categoryId}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {expense.expenseDate}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {expense.amount}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {expense.description}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    <button
                      className="btn"
                      onClick={() =>
                        navigate(`/update-expense/${expense.expenseNumber}`)
                      }
                      style={{
                        backgroundColor: "#2980b9",
                        color: "#ecf0f1",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(expense.expenseNumber)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "#ecf0f1",
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
