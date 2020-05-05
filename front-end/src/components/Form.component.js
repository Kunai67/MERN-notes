import React, { Component } from 'react';
import { Form, Alert, FormGroup, Label } from 'reactstrap';

export default class FormWithErrorHandling extends Component {
    constructor(props) {
        super(props);

        this.stateObj = {
            errors: []
        };

        React.Children.forEach(this.props.children, child => {
            if (child.props.name) {
                if(child.props.value) {
                    this.stateObj[child.props.name] = child.props.value;
                } else {
                    this.stateObj[child.props.name] = '';
                }
            }
        });
    
        this.state = this.stateObj;        

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onBlur(e) {
        if (!e.target.value) {
            let errorSet = new Set();
            this.state.errors.forEach(err => errorSet.add(err));
            errorSet.add(e.target.name);

            this.setState({ errors: Array.from(errorSet) });
        } else {
            if (this.state.errors.includes(e.target.name)) {
                this.setState({ errors: this.state.errors.filter(v => v !== e.target.name) });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.errors.length > 0) return alert('Please fill in all the details');

        const stateCopy = this.state;
        delete stateCopy.errors;

        this.props.onSubmit(stateCopy);
    }

    renderInput() {

        let reactElems = React.Children.map(this.props.children, child => {
            if (child.props.name) {
                return (
                    <FormGroup>
                        <Label for={child.props.name}>{child.props.name[0].toUpperCase() + child.props.name.slice(1)}</Label>
                        { 
                            React.cloneElement(child, { 
                                onChange: this.onChange, 
                                onBlur: this.onBlur, 
                                value: this.state[child.props.name]
                            }) 
                        }
                    </FormGroup>
                )
            } else if (child.props.type === 'submit') {
                return React.cloneElement(child, { onClick: this.onSubmit });
            } else {
                return child;
            }
        });

        return reactElems;
    }

    render() {
        return (
            <Form>
                { this.state.errors.length > 0 ? <Alert color="danger">{`Error: ${this.state.errors.join(', ')} cannot be empty`}</Alert> : null }
                { this.renderInput() }
            </Form>   
        ) 
    }
}

// children must be only be inputs - ok
// create form group with label - ok
// add onchange, onblur and value to inputs - ok
// add input name to state - ok
// find a way to submit data - ok
// apply to all forms
