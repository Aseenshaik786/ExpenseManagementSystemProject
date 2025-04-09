import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getExpenseById, updateExpense } from "../../Services/ExpenseService";
import { displayAllCategories } from "../../Services/CategoryService"; 

import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    categoryId: "",
    expenseDate: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getExpenseById(id);
        setExpense(response.data);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await displayAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchExpense();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(id, expense);
      alert("Expense updated successfully!");
      navigate("/expenseListCust");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense.");
    }
  };

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
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          width: "50%",
          backgroundColor: "rgba(50, 64, 80, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "30px",
          color: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "white" }}>
          <u>Update Expense</u>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={expense.description}
              onChange={handleChange}
              required
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={expense.amount}
              onChange={handleChange}
              required
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="categoryId"
              className="form-select"
              value={expense.categoryId}
              onChange={handleChange}
              required
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid #ccc" }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="expenseDate"
              className="form-control"
              value={expense.expenseDate}
              onChange={handleChange}
              required
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success me-2">
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/expenseListCust")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseUpdate;