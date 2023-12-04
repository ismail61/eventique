import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const VendorNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/vendor/items">
        <div className="">
          <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">

        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Button variant="primary" className="mx-2">
            <NavLink to={'/vendor/orders'} className="nav-link">
              Orders
            </NavLink>
          </Button>
          <Button variant="primary" className="mx-2">
            <NavLink to={'/vendor/items'} className="nav-link">
              Items
            </NavLink>
          </Button>
          <Button variant="primary" className="mx-2">
            <NavLink to={'/logout'} className="nav-link">
              Logout
            </NavLink>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default VendorNavbar;
