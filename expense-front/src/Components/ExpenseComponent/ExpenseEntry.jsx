import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { saveExpense, updateExpense, generateExpenseNumber } from "../../Services/ExpenseService";
import { displayAllCategories } from "../../Services/CategoryService";
import "../../LoginView.css";

const ExpenseEntry = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams(); // Get categoryId from URL
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    expenseNumber: "",
    categoryId: categoryId || "", // Pre-fill category ID if available
    expenseDate: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    generateExpenseNumber()
      .then((response) => {
        setExpense((prev) => ({ ...prev, expenseNumber: response.data }));
      })
      .catch((error) => console.error("Error fetching expense number:", error));
  }, []);

  useEffect(() => {
    displayAllCategories()
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛡️ Basic Validation
    if (!expense.categoryId) {
      Swal.fire("Validation Error", "Please select a category.", "warning");
      return;
    }

    if (!expense.expenseDate) {
      Swal.fire("Validation Error", "Please select an expense date.", "warning");
      return;
    }

    if (!expense.amount || expense.amount <= 0) {
      Swal.fire("Validation Error", "Please enter a valid amount greater than 0.", "warning");
      return;
    }

    if (!expense.description.trim()) {
      Swal.fire("Validation Error", "Please enter a description.", "warning");
      return;
    }

    const action = expense.expenseId ? updateExpense : saveExpense;

    action(expense)
      .then(() => {
        Swal.fire("Success", `Expense ${expense.expenseId ? "Updated" : "Saved"} Successfully!`, "success");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error saving expense:", error);
        Swal.fire("Error", "Something went wrong while saving the expense.", "error");
      });
  };

  return (
    <div
      className="register-background"
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg ')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          padding: "20px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 style={{ color: "rgba(234, 169, 39, 0.88)", fontSize: "30px" }}>
          <u>{expense.expenseId ? "Update Expense" : "Add Expense"}</u>
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group text-start">
            <label>Expense Number:</label>
            <input
              type="text"
              className="form-control"
              value={expense.expenseNumber}
              readOnly
            />
          </div>

          <div className="form-group mt-3 text-start">
            <label>Category:</label>
            <select
              className="form-control"
              name="categoryId"
              value={expense.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-3 text-start">
            <label>Expense Date:</label>
            <input
              type="date"
              className="form-control"
              name="expenseDate"
              value={expense.expenseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3 text-start">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3 text-start">
            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={expense.description}
              onChange={handleChange}
              required
            />
          </div>

          <br />
          <button
            className="btn w-100"
            type="submit"
            style={{ backgroundColor: "#007bff", color: "#fff" }}
          >
            {expense.expenseId ? "Update" : "Save"} Expense
          </button>
          <button
            className="btn w-100 mt-2"
            type="button"
            style={{ backgroundColor: "#ff6f61", color: "#fff" }}
            onClick={() => navigate(-1)}
          >
            Return
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEntry;