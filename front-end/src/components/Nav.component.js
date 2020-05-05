import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Button,
  NavbarBrand,
} from 'reactstrap';
import LogoutButton from './LogoutBtn.component';

function NotesNav(props) {
  // Toggle open and close nav on mobile
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand className="font-weight-bold">Notes App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="d-flex justify-content-end">
          <Nav navbar>
              {
                props.isAuthenticated ?
                <> 
                  <LogoutButton toggleAuth={props.toggleAuth}>Logout</LogoutButton> 
                </>
                : <Link to="/"><Button>Login</Button></Link>
              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NotesNav;
