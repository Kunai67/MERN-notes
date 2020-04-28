import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function createTags(tags) {
    if (tags.length > 0 && tags[0] !== '') {
        return (
            <ul>
                {tags.map(tag => {
                    return <li key={tag}>{tag[0].toUpperCase() + tag.slice(1)}</li>
                })}
            </ul>
        )
    } else {
        return null;
    }
}

export default function Note(props) {
    const data = props.data;
    const locationData = {
        pathname: '/update',
        state: { note: data }
    };

    return (
        <div className="border border-dark rounded p-4 d-inline-block m-4">
            <h3>{data.title}</h3>
            <p>{data.body}</p>
            <p>Created at: {moment(new Date(data.createdAt)).format('M/D/YYYY hh:mm a')}</p>
            <p>Updated at: {moment(new Date(data.updatedAt)).format('M/D/YYYY hh:mm a')}</p>
            { createTags(data.tags) }
            <Button color="danger" onClick={() => props.deleteNote(data._id)} className="mr-2">Delete</Button>
            <Link to={locationData}><Button color="success">Update</Button></Link>
        </div>
    )
}
