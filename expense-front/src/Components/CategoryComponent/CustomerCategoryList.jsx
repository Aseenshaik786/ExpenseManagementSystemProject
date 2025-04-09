import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { displayAllCategories } from "../../Services/CategoryService";

const CustomerCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    displayAllCategories()
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  const returnBack = () => {
    navigate("/CustomerMenu");
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
          <u>Customer Category List</u>
        </h2>
        <hr
          style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }}
        />
        {categories.length > 0 ? (
          <table className="table">
            <thead>
              <tr style={{ borderRadius: "20px" }}>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Category ID
                </th>
                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>
                  Category Name
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
              {categories.map((category) => (
                <tr key={category.categoryId}>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {category.categoryId}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {category.categoryName}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    {category.description}
                  </td>
                  <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                    <button
                      className="btn"
                      onClick={() => navigate(`/Expense-entry/${category.categoryId}`)}
                      style={{ backgroundColor: "#2980b9", color: "#ecf0f1" }}
                    >
                      Expense Entry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No categories found</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            className="btn"
            onClick={returnBack}
            style={{
              backgroundColor: "#27ae60",
              color: "#ecf0f1",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCategoryList;