import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css"; 

function AdminMenu() {
  const navigate = useNavigate();

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
        <Navbar.Brand className="fw-bold fs-4 text-warning">Expense Management Admin Menu</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Customer Dropdown */}
            <NavDropdown title="Customer" className="mx-3 fw-bold fs-5">
              <NavDropdown.Item onClick={() => navigate("/customer-list")}>Customer List</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/current-customer")}>Current Customer List</NavDropdown.Item>
            </NavDropdown>

            {/* Category Dropdown */}
            <NavDropdown title="Category" className="mx-3 fw-bold fs-5">
              <NavDropdown.Item onClick={() => navigate("/category-add")}>Add Category</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/admin-category-list")}>List Category</NavDropdown.Item>
            </NavDropdown>

            {/* Expense Report */}
            <Nav.Link onClick={() => navigate("/admin-report")} className="fw-bold mx-3 fs-5">Expense Report</Nav.Link>

            {/* Logout */}
            <Nav.Link onClick={() => navigate("/")} className="text-danger fw-bold mx-3 fs-5" style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  );
}

export default AdminMenu;