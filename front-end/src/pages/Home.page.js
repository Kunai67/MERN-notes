import React, { Component } from 'react'
import { Container, Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            errors: []
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onBlur(e) {
        if (!e.target.value && e.target.name !== 'tags') {
            let errorSet = new Set();
            this.state.errors.forEach(err => errorSet.add(err));
            errorSet.add(e.target.name);

            this.setState({ errors: Array.from(errorSet) });
        } else {
            if (this.state.errors.includes(e.target.name) && e.target.name !== 'tags') {
                this.setState({ errors: this.state.errors.filter(v => v !== e.target.name) });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.errors.length === 0) {
            const UserObj = { 
                email: this.state.email,
                password: this.state.password
            }
    
            axios.post('http://localhost:5000/auth/login', UserObj).then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', jwt.decode(res.data.token).id);
                this.props.toggleAuth(true);
            }).catch(err => console.log(err));
        } else {
            alert('Please fill in all the details');
        }
    }

    render() {
        return (
            <Container className="py-5">
                <h1 className="text-center d-block text-primary">Notes MERN App</h1>
                <h5 className="text-center d-block text-secondary mb-5">A Notes App made with MongoDB (Mongoose), ExpressJS, ReactJS and NodeJS</h5>

                <Form className="w-50 mx-auto border border-primary rounded px-5">
                    <h4 className="text-center text-dark mt-3">LOGIN</h4>
                    <p className=" text-center mb-2">Don't have an account? <Link to="/register">Register here</Link></p>
                    { this.state.errors.length > 0 ? <Alert color="danger">{`Error: ${this.state.errors.join(', ')} cannot be empty`}</Alert> : null }
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" className="border border-primary" autoComplete="off" value={this.state.email} onChange={this.onChange} onBlur={this.onBlur}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" className="border border-primary" autoComplete="off" value={this.state.password} onChange={this.onChange} onBlur={this.onBlur}/>
                    </FormGroup>
                    <Button color="success" onClick={this.onSubmit} className="mb-4">Login</Button>
                </Form>
            </Container>
        )
    }
}