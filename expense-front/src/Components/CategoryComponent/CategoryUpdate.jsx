import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../LoginView.css";
import { displayCategoryById, updateCategory } from "../../Services/CategoryService";

const CategoryUpdate = () => {
  const [category, setCategory] = useState({
    categoryId: 0,
    categoryName: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const param = useParams();
  let navigate = useNavigate();

  const setCategoryData = () => {
    displayCategoryById(param.categoryId).then((response) => {
      setCategory(response.data);
    });
  };

  useEffect(() => {
    setCategoryData();
  }, []);

  const returnBack = () => {
    navigate('/admin-category-list');
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!category.categoryName.trim()) {
      tempErrors.categoryName = "Category name is required";
    }
    if (!category.description.trim()) {
      tempErrors.description = "Description is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const categorySave = (event) => {
    event.preventDefault();
    if (!validate()) return;

    updateCategory(category)
      .then(() => {
        alert("Category is Updated");
        navigate("/admin-category-list");
      })
      .catch((error) => {
        alert("Update failed!");
        console.error(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg ')",
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
          width: "30%",
          backgroundColor: "rgb(50 64 80 / 59%)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          color: "#ecf0f1",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#f1c40f" }}><u>Update Category</u></h2>
        <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }} />
        <form onSubmit={categorySave}>
          <div className="form-group text-start">
            <label>Category Name:</label>
            <input
              type="text"
              className="form-control"
              name="categoryName"
              value={category.categoryName}
              onChange={onChangeHandler}
              placeholder="Category Name"
            />
            {errors.categoryName && (
              <small style={{ color: "#e74c3c" }}>{errors.categoryName}</small>
            )}
          </div>
          <div className="form-group text-start mt-2">
            <label>Category Description:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={category.description}
              onChange={onChangeHandler}
              placeholder="Category Description"
            />
            {errors.description && (
              <small style={{ color: "#e74c3c" }}>{errors.description}</small>
            )}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn"
              type="submit"
              style={{ backgroundColor: "#007bff", color: "#fff", width: "48%" }}
            >
              Update
            </button>
            <button
              className="btn"
              type="button"
              onClick={returnBack}
              style={{ backgroundColor: "#27ae60", color: "#fff", width: "48%" }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdate;