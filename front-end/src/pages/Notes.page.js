import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import axios from 'axios';

import Note from '../components/Note.component';

export default class NotesPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             notes: []
        }

        this.deleteNote = this.deleteNote.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/').then(res => {
            this.setState({ notes: res.data });
        });
    }

    deleteNote(id) {
        axios.delete(`http://localhost:5000/delete/${id}`).then(res => {
            this.setState({ notes: this.state.notes.filter(el => el._id !== id) });
        });
    }

    renderNotes(notes) {
        const noteCollection = notes.map(el => {
            return <Note data={el} key={el._id} deleteNote={this.deleteNote}/>
        })

        return noteCollection;
    }

    render() {
        return (
            <Container>
                <h2 className="text-center text-primary my-3">Notes List</h2>
                <Link to="./new"><Button color="primary" className="mx-auto d-block">New Note</Button></Link>
                { this.renderNotes(this.state.notes) }
            </Container>
        )
    }
}