import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';


export default function LogoutButton(props) {
    const history = useHistory();
  
    return (
      <Button onClick={() => {
        localStorage.removeItem('token');
        props.toggleAuth(false);
        history.push('/');
      }}>
        { props.children }
      </Button>
    )
}