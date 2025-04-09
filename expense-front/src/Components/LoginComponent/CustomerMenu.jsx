import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function CustomerMenu() {
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState();
   
    useEffect(() => {
        const storedCustomer = JSON.parse(localStorage.getItem("customerId"));
        if (storedCustomer && storedCustomer.customerId) {
            setCustomerId(storedCustomer.customerId);
        }
    }, []);

    return (
        <div style={{
        backgroundImage: "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
    <Navbar style={{ backgroundColor: "#001F3F" ,height: "80px"}} variant="dark" expand="lg" className="py-3" >
      <Container fluid>
        {/* Left Side - System Name */}
        <Navbar.Brand className="fw-bold fs-4 text-warning">Expense Management Customer Menu</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Customer Dropdown */}
            <NavDropdown title="Customer" className="mx-3 fw-bold fs-5">
              <NavDropdown.Item onClick={() => navigate("/customer-add")}>Customer Registration</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate(`/customer-details/${customerId}`)}>Customer Details</NavDropdown.Item>
            </NavDropdown>

            {/* Expense Dropdown */}
            <NavDropdown title="Expense" className="mx-3 fw-bold fs-5">
              <NavDropdown.Item href="Expense-entry">Expense Entry</NavDropdown.Item>
              <NavDropdown.Item href="/expenseListCust">Expense List</NavDropdown.Item>
              <NavDropdown.Item href="customer-category-list">Category List</NavDropdown.Item>
              <NavDropdown.Item href="/Expense-bar-chart">Expense Report</NavDropdown.Item>
            </NavDropdown>

            {/* Logout */}
            <Nav.Link onClick={() => { localStorage.clear(); navigate("/"); }} className="text-danger fw-bold mx-3 fs-5" style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>

            {/* Profile mentioning Customer */}
            <Nav.Link className="fw-bold text-warning mx-3 fs-5">Customer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
    );
}

export default CustomerMenu;