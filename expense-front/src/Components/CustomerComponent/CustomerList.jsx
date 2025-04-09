import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CustomerList.css";
import { getAllCustomers } from "../../Services/CustomerService";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      });
  }, []);

  const returnBack = () => {
    if (location.state?.from === "customer") {
      navigate("/CustomerMenu");
    } else {
      navigate("/AdminMenu");
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    (customer.customername || "").toLowerCase().includes(search.toLowerCase())
  );

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
                    width: "80%", 
                    backgroundColor: "rgb(50 64 80 / 59%)", 
                    backdropFilter: "blur(10px)", 
                    borderRadius: "12px", 
                    padding: "20px", 
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                    color: "#ecf0f1", 
                    textAlign: "center" 
                }}
            >
                <h2 style={{ color: "white", fontSize:"30px" }}><u>Customer List</u></h2>
                <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }} />
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="form-control mb-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "20%", backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid #ccc", padding: "6px", borderRadius: "5px" }}
                />
                {filteredCustomers.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr style={{ borderRadius: "20px" }}>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Customer ID</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Name</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Email</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Mobile</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Address</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Occupation</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Status</th>
                                <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.customerId}>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.customerId}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.customerName || "N/A"}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{Array.isArray(customer.email) ? customer.email.join(", ") : customer.email || "N/A"}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.mobile || "N/A"}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.address ? customer.address : "N/A"}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.occupation || "N/A"}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.status}</td>
                                    <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>
                                        <button className="btn" onClick={() => navigate(`/customer-update/${customer.customerId}`)} style={{ backgroundColor: "#2980b9", color: "#ecf0f1" }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data">No customers found</p>
                )}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button className="btn" onClick={returnBack} style={{ backgroundColor: "#27ae60", color: "#ecf0f1", padding: "10px 20px", borderRadius: "8px" }}>Return</button>
                </div>
            </div>
        </div>

  );
};

export default CustomerList;