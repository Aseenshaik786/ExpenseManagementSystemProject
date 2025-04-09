import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateCustomerId, saveCustomer, getCustomerStatusByUsername } from "../../Services/CustomerService";
import "../../LoginView.css";

const CustomerAddition = () => {
  const [customer, setCustomer] = useState({
    customerId: "",
    username: "A",
    customerName: "",
    address: "",
    mobile: "",
    occupation: "",
    status: "A"
  });

  const [newId, setNewId] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setCustomerId = () => {
    generateCustomerId()
      .then((response) => setNewId(response.data))
      .catch((error) => console.error("Error generating customer ID:", error));
  };

  const checkStatus = () => {
    getCustomerStatusByUsername()
      .then((response) => {
        if (response.data === true) {
          alert("Customer is already registered.");
          navigate("/CustomerMenu");
        } else {
          setCustomerId();
        }
      })
      .catch((error) => console.error("Error checking customer status:", error));
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.customerName.trim()) newErrors.customerName = "Name is required";
    if (!customer.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{10}$/.test(customer.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!customer.occupation.trim()) newErrors.occupation = "Occupation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const customerSave = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const customerData = { ...customer, customerId: newId };
    saveCustomer(customerData)
      .then(() => {
        alert("New Customer has been added.");
        navigate("/CustomerMenu");
      })
      .catch((error) => console.error("Error saving customer:", error));
  };

  return (
    <div
      className="register-background"
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
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
        <h2><u>New Customer Registration</u></h2>
        <br />
        <form onSubmit={customerSave}>
          <div className="form-group text-start">
            <label>Customer ID:</label>
            <input
              type="text"
              className="form-control"
              value={newId}
              readOnly
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
          </div>
          <div className="form-group mt-3 text-start">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              className="form-control"
              value={customer.customerName}
              onChange={onChangeHandler}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
            {errors.customerName && <small style={{ color: "red" }}>{errors.customerName}</small>}
          </div>
          <div className="form-group mt-3 text-start">
            <label>Customer Address:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={customer.address}
              onChange={onChangeHandler}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
            {errors.address && <small style={{ color: "red" }}>{errors.address}</small>}
          </div>
          <div className="form-group mt-3 text-start">
            <label>Customer Mobile:</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              value={customer.mobile}
              onChange={onChangeHandler}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
            {errors.mobile && <small style={{ color: "red" }}>{errors.mobile}</small>}
          </div>
          <div className="form-group mt-3 text-start">
            <label>Customer Occupation:</label>
            <input
              type="text"
              name="occupation"
              className="form-control"
              value={customer.occupation}
              onChange={onChangeHandler}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc" }}
            />
            {errors.occupation && <small style={{ color: "red" }}>{errors.occupation}</small>}
          </div>
          <br />
          <button className="btn w-100" type="submit" style={{ backgroundColor: "#007bff", color: "#fff" }}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerAddition;