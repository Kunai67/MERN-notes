import React from 'react';
import moment from 'moment';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Tags from './Tags.component';

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
