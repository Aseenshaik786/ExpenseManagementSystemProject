
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenseById, updateExpense } from "../../Services/ExpenseService";
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await getExpenseById(id);
                setExpense(response.data);
            } catch (error) {
                console.error("Error fetching expense:", error);
            }
        };
        fetchExpense();
    }, [id]);

    const validate = () => {
        const newErrors = {};
        if (!expense.description.trim()) newErrors.description = "Description is required.";
        if (!expense.amount || parseFloat(expense.amount) <= 0) newErrors.amount = "Amount must be greater than 0.";
        if (!expense.expenseDate) newErrors.expenseDate = "Date is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

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
                backgroundImage: "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >
            <div
                style={{
                    width: "500px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    padding: "30px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                    color: "white"
                }}
            >
                <h2 className="text-center mb-4" style={{ color: "white" }}>
                    <u>Update Expense</u>
                </h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3 text-start">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={expense.description}
                            onChange={handleChange}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "#fff",
                                border: "1px solid #ccc"
                            }}
                        />
                        {errors.description && <div className="text-danger mt-1">{errors.description}</div>}
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            className="form-control"
                            value={expense.amount}
                            onChange={handleChange}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "#fff",
                                border: "1px solid #ccc"
                            }}
                        />
                        {errors.amount && <div className="text-danger mt-1">{errors.amount}</div>}
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="expenseDate"
                            className="form-control"
                            value={expense.expenseDate}
                            onChange={handleChange}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "#fff",
                                border: "1px solid #ccc"
                            }}
                        />
                        {errors.expenseDate && <div className="text-danger mt-1">{errors.expenseDate}</div>}
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary">Update Expense</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/expenseListCust")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseUpdate;
