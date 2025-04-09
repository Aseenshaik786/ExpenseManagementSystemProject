
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../Services/CustomerService";
import { Container, Card, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import "../../LoginView.css";

const CustomerUpdate = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerId: "",
    username: "",
    customerName: "",
    address: "",
    email: "",
    mobile: "",
    occupation: "",
    status: "true",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getCustomerById(customerId)
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        setError("Failed to load customer data.");
        setLoading(false);
      });
  }, [customerId]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!isValidEmail(customer.email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isValidMobile(customer.mobile)) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    setUpdating(true);

    updateCustomer(customer)
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/customer-list");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        setError("Update failed. Please try again.");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

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
                flexDirection: "column",
                padding: "20px" 
            }}
        >
            <div 
                className="card" 
                style={{ 
                    width: "40%", 
                    backgroundColor: "rgb(50 64 80 / 59%)", 
                    backdropFilter: "blur(10px)", 
                    borderRadius: "12px", 
                    padding: "20px", 
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                    color: "#ecf0f1", 
                    textAlign: "center" 
                }}
            >
                <h2 style={{ color: "#ffff", fontSize:"30px" }}><u>Update Customer</u></h2>
                <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }} />
                {error && <p style={{ color: "#c0392b", fontSize: "14px" }}>{error}</p>}
                <form onSubmit={handleUpdate}>
                    <div className="row mb-2">
                        <div className="col">
                            <label>Customer ID</label>
                            <input type="text" className="form-control" value={customer.customerId} readOnly />
                        </div>
                        <div className="col">
                            <label>Username</label>
                            <input type="text" className="form-control" value={customer.username} readOnly />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label>Name</label>
                            <input type="text" className="form-control" name="customername" value={customer.customerName} onChange={onChangeHandler} required />
                        </div>
                        <div className="col">
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" value={customer.address} onChange={onChangeHandler} required />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={customer.email} onChange={onChangeHandler} required />
                        </div>
                        <div className="col">
                            <label>Mobile</label>
                            <input type="text" className="form-control" name="mobile" value={customer.mobile} onChange={onChangeHandler} required />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label>Occupation</label>
                            <input type="text" className="form-control" name="occupation" value={customer.occupation} onChange={onChangeHandler} required />
                        </div>
                        <div className="col">
                            <label>Status</label>
                            <select className="form-control" name="status" value={customer.status} onChange={onChangeHandler} required>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn w-50 mt-3" type="submit" style={{ backgroundColor: "#007bff", color: "#fff" }} disabled={updating}>
                        {updating ? "Updating..." : "Update"}
                    </button>
                    <button className="btn w-50 mt-3" onClick={() => navigate("/customer-list")} style={{ backgroundColor: "#27ae60", color: "#fff" }}>
                        Back
                    </button>
                </form>
            </div>
        </div>


  );
};

export default CustomerUpdate;
