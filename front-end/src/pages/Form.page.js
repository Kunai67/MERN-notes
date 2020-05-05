import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import FormWithErrorHandling from '../components/Form.component';

class FormPage extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(axiosObj) {
        const NoteObj = {
            userId: this.props.user.id, 
            title: axiosObj.title, 
            body: axiosObj.body, 
            tags: axiosObj.tags ? axiosObj.tags.toLowerCase().split(',') : []
        }

        axios.post('http://localhost:5000/create/', NoteObj, { headers: { 'auth-token': this.props.user.token } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Container>
                <h2 className="text-center text-primary my-3">Create New Note</h2>
    
                <Container className="w-50 mx-auto border border-primary rounded px-5">
                    <FormWithErrorHandling btnText='Submit' onSubmit={this.onSubmit}>
                        <Input type="text" name="title" id="title" className="border border-primary" autoComplete="off" />
                        <Input type="textarea" name="body" id="body" className="border border-primary" />
                        <Input type="text" name="tags" id="tags" className="border border-primary" autoComplete="off" />
                        <Button color="primary" type="submit" className="mt-3" onClick={this.onSubmit}>Submit</Button>
                        <Link to="./"><Button color="secondary" className="ml-3 mt-3">Back to Home</Button></Link>
                    </FormWithErrorHandling>
                </Container>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(FormPage);