import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export default class FormPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             body: '',
             tags: '',
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
            const NoteObj = { 
                title: this.state.title, 
                body: this.state.body, 
                tags: [],
            }

            if (this.state.tags[0] !== '') {
                NoteObj.tags = this.state.tags.split(',').map(v => v.toLowerCase());
                console.log(NoteObj.tags);
            }
    
            axios.post('http://localhost:5000/create/', NoteObj).then(res => console.log(res.data)).catch(err => console.log(err));
        } else {
            alert('Please fill in all the details');
        }
    }

    render() {
        return (
            <Container>
                <h2 className="text-center text-primary my-3">Create New Note</h2>
    
                <Form className="w-50 mx-auto border border-primary rounded p-5">
                { this.state.errors.length > 0 ? <Alert color="danger">{`Error: ${this.state.errors.join(', ')} cannot be empty`}</Alert> : null }
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" className="border border-primary" autoComplete="off" value={this.state.title} onChange={this.onChange} onBlur={this.onBlur}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="body">Body</Label>
                        <Input type="textarea" name="body" id="body" className="border border-primary" value={this.state.body} onChange={this.onChange} onBlur={this.onBlur}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags (Comma-separated)</Label>
                        <Input type="text" name="tags" id="tags" className="border border-primary" autoComplete="off" value={this.state.tags} onChange={this.onChange} onBlur={this.onBlur}/>
                    </FormGroup>
                    <Button color="primary" className="mt-3" onClick={this.onSubmit}>Submit</Button>
                    <Link to="./"><Button color="secondary" className="ml-3 mt-3">Back to Home</Button></Link>
                </Form>
            </Container>
        )
    }
}
