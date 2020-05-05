import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Button,
  NavbarBrand,
  NavbarText
} from 'reactstrap';
import LogoutButton from './LogoutBtn.component';
import { connect } from 'react-redux';

function NotesNav(props) {
  // Toggle open and close nav on mobile
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand className="font-weight-bold">Notes App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="d-flex justify-content-end align-items-center">
          <Nav navbar>
              {
                Object.keys(props.user).length > 0 ?
                <>
                  <NavbarText className="text-light mr-3">Welcome back <span className="font-weight-bold">{props.user.name}</span>!</NavbarText> 
                  <LogoutButton>Logout</LogoutButton> 
                </>
                : <Link to="/"><Button color="success">Login</Button></Link>
              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(NotesNav);
