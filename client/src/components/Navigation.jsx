import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../App.css";
import Logout from "../components/Logout";
import { Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="dark"
      id="nav"
      variant="dark"
    >
      <Navbar.Brand className="ml-5" as={Link} to="/">
        <strong>FullSend</strong>
      </Navbar.Brand>
      <NavDropdown title="Menu" id="collasible-nav-dropdown">
        {currentUser && (
          <>
            <NavDropdown.Item as={Link} to="/profile">
              Profile
            </NavDropdown.Item>
            <Logout />
            <NavDropdown.Item as={Link} to={`/myblogs`}>
              My Blogs
            </NavDropdown.Item>
          </>
        )}
        {!currentUser && (
          <>
            <NavDropdown.Item as={Link} to="/login">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signup">
              SignUp
            </NavDropdown.Item>
          </>
        )}
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/blogs">
          View All Blogs
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
};
export default Navigation;
