import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { resetApp } from '../redux/actions/creators';

// Resets redux store and takes user back to login page
function LogoutButton(props) {
    const history = useHistory();
  
    return (
      <Button onClick={() => { props.resetApp(); history.push('/'); }}>
        { props.children }
      </Button>
    )
}

export default connect(null, { resetApp })(LogoutButton);