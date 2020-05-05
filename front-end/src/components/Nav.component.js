import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutBtn.component';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Button,
  NavbarBrand,
  NavbarText
} from 'reactstrap';

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
              <UserGreeting condition={ Object.keys(props.user).length > 0 } name={props.user.name} />
              <ActionButton condition={ Object.keys(props.user).length > 0 } /> 
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

// Greets the user if there is one, return null otherwise
function UserGreeting(props) {
  return props.condition ? 
          <NavbarText className="text-light mr-3">Welcome back <span className="font-weight-bold">{props.name}</span>!</NavbarText> :
          null
}

// Switches Login and Logout buttons depending on condition given
function ActionButton(props) {
  return props.condition ? 
          <LogoutButton>Logout</LogoutButton> :
          <Link to="/"><Button color="success">Login</Button></Link>
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(NotesNav);
