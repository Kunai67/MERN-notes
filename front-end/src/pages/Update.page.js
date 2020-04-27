import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class UpdatePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            body: '',
            tags: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.location.state.note);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const NoteObj = { 
            title: this.state.title, 
            body: this.state.body, 
            tags: this.state.tags.split(',') 
        }

        axios.put(`http://localhost:5000/update/${this.state._id}`, NoteObj).then(res => console.log(res.data));
    }

    render() {
        if (this.props.location.state.note) {
            return (
                <Container>
                    <h2 className="text-center text-primary my-3">Update Note (ID: {this.props.location.state.note._id})</h2>
                    <Form className="w-50 mx-auto border border-primary rounded p-5 my-5">
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" className="border border-primary" autoComplete="off" value={this.state.title} onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="body">Body</Label>
                            <Input type="textarea" name="body" id="body" className="border border-primary" value={this.state.body} onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="tags">Tags (Comma-separated)</Label>
                            <Input type="text" name="tags" id="tags" className="border border-primary" autoComplete="off" value={this.state.tags} onChange={this.onChange}/>
                        </FormGroup>
                        <Button color="primary" className="mt-3" onClick={this.onSubmit}>Submit</Button>
                        <Link to="./"><Button color="secondary" className="ml-3 mt-3">Back to Home</Button></Link>
                    </Form>
                </Container>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}
