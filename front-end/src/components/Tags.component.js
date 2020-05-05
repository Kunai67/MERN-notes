import React from 'react';

export default function Tags(props) {
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