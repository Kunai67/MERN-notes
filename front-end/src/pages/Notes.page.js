import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Input } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Note from '../components/Note.component';

class NotesPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             notes: [],
             filter: ''
        }

        this.deleteNote = this.deleteNote.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.sortNotes = this.sortNotes.bind(this);
        this.onChange = this.onChange.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    filterNotes() {
        if (this.state.filter) {
            this.setState({ notes: this.state.originalNotes.filter(val => val.tags.includes(this.state.filter)) });
        } else {
            this.setState({ notes: this.state.originalNotes });
        }
    }

    componentDidMount() {
        //                                  this.props.user.id
        axios.get(`http://localhost:5000/${localStorage.getItem('id')}`, { headers: { 'auth-token': localStorage.getItem('token') } }).then(res => {
            this.setState({ notes: res.data, originalNotes: res.data });
        }).catch(err => console.log(err));
    }

    deleteNote(id) {
        axios.delete(`http://localhost:5000/delete/${id}`, { headers: { 'auth-token': localStorage.getItem('token') } }).then(res => {
            this.setState({ notes: this.state.notes.filter(el => el._id !== id) });
        }).catch(err => console.log(err));
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
                    <Container className="d-flex w-50">
                        <Input type="text" name="filter" id="filter" className="border border-primary" autoComplete="off" placeholder="Filter By Tag" value={this.state.filter} onChange={this.onChange} />
                        <Button color="secondary" className="mx-3" onClick={() => this.filterNotes()}>Filter</Button>
                    </Container>
                </Container>
                { this.renderNotes(this.state.notes) }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return user;
}

export default connect(mapStateToProps)(NotesPage);