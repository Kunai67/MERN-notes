import React, { Component } from 'react'
import { Container } from 'reactstrap';
import axios from 'axios';


export default class NotesPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             notes: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/').then(res => {
            this.setState({ notes: res.data });
        });
    }

    render() {
        return (
            <Container>
                <h2 className="text-center text-primary my-3">Notes List</h2>

                {
                    this.state.notes.map(el => {
                        return (<div key={el._id}>
                                    <h3>{el.title}</h3>
                                    <p>{el.body}</p>
                                    <p>Created at: {new Date(el.createdAt).toString()}</p>
                                    <p>Updated at: {new Date(el.updatedAt).toString()}</p>
                                    <ul>
                                        {el.tags.map(tag => {
                                            return <li key={tag}>{tag}</li>
                                        })}
                                    </ul>
                                    <p>{el._id}</p>
                                </div>)
                    })
                }
            </Container>
        )
    }
}