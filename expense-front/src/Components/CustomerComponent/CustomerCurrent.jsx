import React ,{useState,useEffect} from "react";
import {getCurrentCustomers} from '../../Services/CustomerService';
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';

const CustomerCurrent=()=>{

    const [customers,setCustomers]=useState([]);

    let navigate=useNavigate();

    const setCustomerData=()=>{
        getCurrentCustomers().then((response) => {
            setCustomers(response.data);
                });

    }

    useEffect(() => {
        setCustomerData()
       }, []);

       const returnBack=()=>{
        navigate('/AdminMenu'); 
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
                <h2 style={{ color: "#f1c40f" }}><u>Current Customer List</u></h2>
                <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "#e67e22" }} />
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Customer Id</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Customer Name</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Username</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Customer Address</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Customer Email</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Mobile</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Occupation</th>
                            <th style={{ backgroundColor: "rgba(6, 218, 207, 0.94)" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customerId}>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.customerId}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.customerName}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.username}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.address}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.email}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.mobile}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.occupation}</td>
                                <td style={{ backgroundColor: "rgba(138, 240, 242, 0.9)" }}>{customer.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <button className="btn" onClick={returnBack} style={{ backgroundColor: "#27ae60", color: "#fff", width: "25%" }}>Return</button>
            </div>
        </div>

 
    );
}
export default CustomerCurrent;