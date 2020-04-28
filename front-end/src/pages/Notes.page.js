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
        this.sortNotes = this.sortNotes.bind(this);
    }

    sortNotes(sortMode) {
        switch (sortMode) {
            case 'date':
                this.setState({ notes: this.state.notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) });
                break;
            case 'title':
                this.setState({ 
                    notes: this.state.notes.sort((a, b) =>{
                                if(a.title < b.title) { return -1; }
                                if(a.title > b.title) { return 1; }
                                return 0;
                            }) 
                    });
                console.log(this.state.notes);
                break;
            default:
                break;
        }
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
                <Container className="d-flex justify-content-center">
                    <Link to="./new"><Button color="primary" className="mx-3">New Note</Button></Link>
                    <Button color="secondary" className="mx-3" onClick={() => this.sortNotes('date')}>Sort By Date</Button>
                    <Button color="secondary" className="mx-3" onClick={() => this.sortNotes('title')}>Sort By Title</Button>
                </Container>
                { this.renderNotes(this.state.notes) }
            </Container>
        )
    }
}