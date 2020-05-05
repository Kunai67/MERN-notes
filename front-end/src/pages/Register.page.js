import React, { Component } from 'react'
import { Container, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormWithErrorHandling from '../components/Form.component';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)
    
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(axiosObj) {
        axios.post('http://localhost:5000/auth/register', axiosObj).then(res => {
            alert(res.data.message);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Container className="py-5">
                <Container className="w-50 mx-auto border border-primary rounded px-5">
                    <h4 className="text-center text-dark mt-3">Register</h4>
                    <p className=" text-center mb-2">Already have an account? <Link to="/">Sign In</Link></p>
                    <FormWithErrorHandling onSubmit={this.onSubmit}>
                        <Input type="text" name="name" id="name" className="border border-primary" autoComplete="off" />
                        <Input type="text" name="email" id="email" className="border border-primary" autoComplete="off" />
                        <Input type="password" name="password" id="password" className="border border-primary" autoComplete="off" />
                        <Button color="success" type="submit" className="mb-4">Register</Button>
                    </FormWithErrorHandling>
                </Container>
            </Container>
        )
    }
}