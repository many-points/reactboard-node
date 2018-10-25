import React, { Component } from 'react';

import Post from './Post';
import PostForm from './PostForm';
import Loading from './Loading';


class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      posts: [],
      loading: false,
      error: false
    }

    this.addPost = this.addPost.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetch(`/api/thread/${this.state.id}`)
    .then(res => res.json())
    .then(res => this.setState({ posts: res.data.posts, loading: false }))
    .catch(error => {
      console.error(error);
      setTimeout(() => this.setState({error: true}));
    });
  }

  componentDidMount() {

  }

  addPost(threadId, text) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({threadId, text})
    }
    this.setState({ loading: true });
    return fetch(`/api/post`, request)
    .then(res => res.json())
    .then(res => this.setState({ posts: [...this.state.posts, res.post], loading: false }))
    .catch(error => {
      console.error(error);
      setTimeout(() => this.setState({error: true}));
    });
  }

  render() {
    const loading = this.state.loading, error = this.state.error;
    const posts = this.state.posts.map((post, index) => {
      return (
        <li key={post._id}>
          <Post id={post._id}
                humanId={post.humanId}
                text={post.text}
                createdAt={post.createdAt} />
        </li>
      );
    }).reverse();
    return (
      <>
        <PostForm id={this.state.id} addPost={this.addPost} />
        <ul className='unstyled posts'>
          {(loading || error) && <Loading error={error} />}{posts}
        </ul>
      </>
    );
  }
}

export default Thread;