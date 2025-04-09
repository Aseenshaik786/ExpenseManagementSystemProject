import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateCategoryId, saveCategory } from '../../Services/CategoryService';

const CategoryAddition = () => {
  const [category, setCategory] = useState({
    categoryId: 0,
    categoryName: "",
    description: "",
  });

  const [newId, setNewId] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setCategoryId = () => {
    generateCategoryId().then((response) => {
      setNewId(response.data);
    });
  };

  useEffect(() => {
    setCategoryId();
  }, []);

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

    category.categoryId = newId;
    saveCategory(category).then(() => {
      alert("New Category is added");
      navigate('/AdminMenu');
    }).catch(err => {
      alert("Failed to save category");
      console.error(err);
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg)",
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
        <h2 style={{ color: "#f1c40f" }}><u>New Category Addition</u></h2>
        <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }} />
        <form>
          <div className="form-group text-start">
            <label>Category Id:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Category Id"
              name="categoryId"
              value={newId}
              readOnly
            />
          </div>
          <div className="form-group text-start mt-2">
            <label>Category Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              name="categoryName"
              value={category.categoryName}
              onChange={onChangeHandler}
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
              placeholder="Category Description"
              name="description"
              value={category.description}
              onChange={onChangeHandler}
            />
            {errors.description && (
              <small style={{ color: "#e74c3c" }}>{errors.description}</small>
            )}
          </div>
          <button
            className="btn mt-3"
            onClick={categorySave}
            style={{ backgroundColor: "#27ae60", color: "#fff", width: "25%" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAddition;    