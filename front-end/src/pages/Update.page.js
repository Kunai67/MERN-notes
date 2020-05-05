import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Input, Button } from 'reactstrap';
import FormWithErrorHandling from '../components/Form.component';

export default class UpdatePage extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(axiosObj) {
        const NoteObj = { 
            title: axiosObj.title, 
            body: axiosObj.body, 
            tags: axiosObj.tags ? axiosObj.tags.toLowerCase().split(',') : []
        }

        axios.put(`http://localhost:5000/update/${this.props.location.state.note._id}`, NoteObj, { headers: { 'auth-token': localStorage.getItem('token') } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        const note = this.props.location.state.note;
        if (note) {
            return (
                <Container>
                    <h2 className="text-center text-primary my-3">Update Note (ID: {note._id})</h2>
                    <Container className="w-50 mx-auto border border-primary rounded p-5 my-5">
                        <FormWithErrorHandling onSubmit={this.onSubmit}>
                            <Input type="text" name="title" id="title" className="border border-primary" autoComplete="off" value={note.title} />
                            <Input type="textarea" name="body" id="body" className="border border-primary" value={note.body} />
                            <Input type="text" name="tags" id="tags" className="border border-primary" autoComplete="off" value={note.tags} />
                            <Button color="primary" type="submit" className="mt-3">Submit</Button>
                            <Link to="./"><Button color="secondary" className="ml-3 mt-3">Back to Home</Button></Link>
                        </FormWithErrorHandling>
                    </Container>
                </Container>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}
