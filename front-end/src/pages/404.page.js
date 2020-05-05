import React from 'react';
import { Container } from 'reactstrap';

export default function ErrorPage() {
    return (
        <Container className="d-flex py-5 justify-content-center">
            <h1 className='text-danger'>Uh oh! Page not found!</h1>
        </Container>
    )
}
