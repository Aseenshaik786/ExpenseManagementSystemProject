import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
  const [expenseUser, setExpenseUser] = useState({
    username: "",
    password: "",
    email: "",
    category: "",
  });
  const [password2, setPassword2] = useState("");
  const [formValidated, setFormValidated] = useState(false);
  const navigate = useNavigate();

  const saveNewUser = (event) => {
    event.preventDefault();
    setFormValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
      alert("Password must be between 5 to 10 characters long");
      return;
    }

    if (expenseUser.password !== password2) {
      alert("Passwords are not matched");
      return;
    }

    registerNewUser(expenseUser).then(() => {
      alert("User is registered successfully... Go For Login");
      navigate('/');
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setExpenseUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="register-background"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1565021324587-5fd009870e68?w=600&auto=format&fit=crop&q=60')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
        }}
      >
        <h2 style={{ color: "white" }}><u>New User Registration</u></h2>
        <br />
        <form 
          onSubmit={saveNewUser} 
          noValidate 
          className={formValidated ? "was-validated" : ""}
        >
          <div className="form-group text-start mb-3">
            <label>User Name:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
              value={expenseUser.username}
              onChange={onChangeHandler}
              required
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid #ccc"
              }}
            />
            <div className="invalid-feedback">Username is required</div>
          </div>

          <div className="form-group text-start mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={expenseUser.password}
              onChange={onChangeHandler}
              required
              minLength={5}
              maxLength={10}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid #ccc"
              }}
            />
            <div className="invalid-feedback">
              Password must be 5–10 characters.
            </div>
          </div>

          <div className="form-group text-start mb-3">
            <label>Retype/Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid #ccc"
              }}
            />
            <div className="invalid-feedback">Please confirm your password</div>
          </div>

          <div className="form-group text-start mb-3">
            <label>User Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              name="email"
              value={expenseUser.email}
              onChange={onChangeHandler}
              required
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid #ccc"
              }}
            />
            <div className="invalid-feedback">Valid email is required</div>
          </div>

          <div className="form-group text-start mb-3">
            <label>Select Category:</label>
            <input
              list="types"
              name="category"
              className="form-control"
              value={expenseUser.category}
              onChange={onChangeHandler}
              required
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid #ccc"
              }}
            />
            <datalist id="types">
              <option value="Customer" />
              <option value="Admin" />
            </datalist>
            <div className="invalid-feedback">Please select a user category</div>
          </div>

          <button className="btn w-100" type="submit" style={{ backgroundColor: "#007bff", color: "#fff" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;