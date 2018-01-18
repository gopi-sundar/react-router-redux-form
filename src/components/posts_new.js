import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        console.log(values);
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field label="Title" name="title" component={this.renderField} />
                    <Field label="Categories" name="categories" component={this.renderField} />
                    <Field label="Post Content" name="content" component={this.renderField} />

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="btn btn-danger" to="/">
                        Cancel
                    </Link>
                </form>
                PostsNew!
            </div>
        )
    }
}

function validate(values) {
    //console.log(values) -> {title: 'asdf', categories : 'wetwet' , content:'wrdw'}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is atleast 3 character!'
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories!'
    }
    if (!values.content) {
        errors.content = 'Enter post content!'
    }

    // If empty, validation is successful
    // If any  properties inside, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);