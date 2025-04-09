import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, getCustomerByUsername } from "../../Services/CustomerService";


const CustomerDetails = () => {
   
    const [customer, setCustomer] = useState({
        customerId:"",
        username:"",
        customerName:"",
        address:"",
        email:"",
        mobile:0,
        occupation:"",
        status:""
    });
    let navigate=useNavigate();
    const setCustomerData=() =>{
        getCustomerByUsername().then((response)=>{
            setCustomer(response.data);
        });
    }
    

    useEffect(() => {
        setCustomerData();
         
    }, []);

    

    return (
        <div 
            className="login-background" 
            style={{ 
                backgroundImage: "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')", 
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
                    backgroundColor: "rgba(255, 255, 255, 0.1)",  // Transparent effect
                    backdropFilter: "blur(10px)", 
                    borderRadius: "10px", 
                    padding: "20px", 
                    color: "#ffffff", // White text for contrast
                    textAlign: "center", 
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
                }}
            >
                <h2 style={{color:"white"}}><u>Customer Details</u></h2>
                <br />
                {customer ? (
                    <div className="text-start">
                        <p><strong>ID:</strong> {customer.customerId}</p>
                        <p><strong>Name:</strong> {customer.customerName || "N/A"}</p>
                        <p><strong>Email:</strong> {customer.email || "N/A"}</p>
                        <p><strong>Mobile:</strong> {customer.mobile || "N/A"}</p>
                        <p><strong>Address:</strong> {customer.address || "N/A"}</p>
                        <p><strong>Occupation:</strong> {customer.occupation || "N/A"}</p>
                    </div>
                ) : (
                    <p>No customer found</p>
                )}
                <br />
                <button className="btn w-100" onClick={() => navigate("/CustomerMenu")} style={{ backgroundColor: "#17a2b8", color: "#fff" }}>Back to Customer Menu</button>
            </div>
        </div>

    );
};

export default CustomerDetails;