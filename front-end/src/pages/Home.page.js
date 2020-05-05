import React, { Component } from 'react'
import { Container, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { authenticate, requestUser, receiveUser } from '../redux/actions/creators';
import FormWithErrorHandling from '../components/Form.component';

class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(axiosObj) {
        this.props.requestUser();
        axios.post('http://localhost:5000/auth/login', axiosObj).then(res => {
            this.props.authenticate(true);
            const { id, name } = jwt.decode(res.data.token);
            this.props.receiveUser({ id, name, token: res.data.token });
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Container className="py-5">
                <h1 className="text-center d-block text-primary">Notes MERN App</h1>
                <h5 className="text-center d-block text-secondary mb-5">A Notes App made with MongoDB (Mongoose), ExpressJS, ReactJS and NodeJS</h5>

                <Container className="w-50 mx-auto border border-primary rounded px-5">
                    <h4 className="text-center text-dark mt-3">LOGIN</h4>
                    <p className=" text-center mb-2">Don't have an account? <Link to="/register">Register here</Link></p>
                    <FormWithErrorHandling onSubmit={this.onSubmit}>
                        <Input type="text" name="email" id="email" className="border border-primary" autoComplete="off" />
                        <Input type="password" name="password" id="password" className="border border-primary" autoComplete="off" />
                        <Button color="success" type="submit" className="mb-4">Login</Button>
                    </FormWithErrorHandling>
                </Container>
            </Container>
        )
    }
}

export default connect(null, { authenticate, requestUser, receiveUser })(HomePage);