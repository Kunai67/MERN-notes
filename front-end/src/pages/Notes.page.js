import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

export default class NotesPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             notes: []
        }

        this.deleteNote = this.deleteNote.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/').then(res => {
            this.setState({ notes: res.data });
        });
    }

    deleteNote(id) {
        axios.delete(`http://localhost:5000/delete/${id}`).then(res => {
            this.setState({ notes: this.state.notes.filter(el => el._id !== id) });
            alert(res.data);
        });
    }

    render() {
        return (
            <Container>
                <h2 className="text-center text-primary my-3">Notes List</h2>
                <Link to="./new"><Button color="primary" className="mx-auto d-block">New Note</Button></Link>
                {
                    this.state.notes.map(el => {
                        return (<div key={el._id}>
                                    <h3>{el.title}</h3>
                                    <p>{el.body}</p>
                                    <p>Created at: {moment(new Date(el.createdAt)).format('M/D/YYYY hh:mm a')}</p>
                                    <p>Updated at: {moment(new Date(el.updatedAt)).format('M/D/YYYY hh:mm a')}</p>
                                    <ul>
                                        {el.tags.map(tag => {
                                            return <li key={tag}>{tag}</li>
                                        })}
                                    </ul>
                                    <Button color="danger" onClick={() => this.deleteNote(el._id)}>Delete</Button>
                                </div>)
                    })
                }
            </Container>
        )
    }
}