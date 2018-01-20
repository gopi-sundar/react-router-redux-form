import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router-dom';


class PostsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link className="btn btn-primary" to="/">
                    Back To Index
                </Link>

                <h3>{post.title}</h3>
                <h3>Categories:{post.categories}</h3>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost })(PostsShow);
