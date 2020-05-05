import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// Renders the note with update and delete buttons
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
            <Tags tags={data.tags} />
            <Button color="danger" onClick={() => props.deleteNote(data._id)} className="mr-2">Delete</Button>
            <Link to={locationData}><Button color="success">Update</Button></Link>
        </div>
    )
}

// Renders a ul full of tags or null (if there are no tags)
function Tags(props) {
    if (props.tags.length > 0 && props.tags[0] !== '') {
        return (
            <ul>
                {props.tags.map(tag => {
                    return <li key={tag}>{tag[0].toUpperCase() + tag.slice(1)}</li>
                })}
            </ul>
        )
    } else {
        return null;
    }
}
