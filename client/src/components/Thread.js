import React, { Component } from 'react';
import fetch from '../utils/timeout';

import Post from './Post';
import Form from './Form';
import Loading from './Loading';


class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      op: '',
      posts: [],
      showForm: false,
      loading: false,
      error: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetch(`/api/thread/${this.state.id}`)
    .then(res => res.json())
    .then(res => this.setState({ posts: res.data.posts, loading: false, op: res.data.op }))
    .catch(error => {
      console.error(error);
      setTimeout(() => this.setState({error: true}));
    });
  }

  addPost(data) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    }
    this.setState({ loading: true });
    return fetch(`/api/post`, request)
    .then(res => res.json())
    .then(res => {
      console.log(request.body)
      if(res.success === false) throw Error('Request failed');
      this.setState({ posts: [...this.state.posts, res.post], loading: false },
        () => window.scrollTo(0, document.body.scrollHeight));
    })
    .catch(error => {
      console.error(error);
      setTimeout(() => this.setState({error: true}));
    });
  }

  render() {
    const form = <Form key='form' id={this.state.id} submit={this.addPost.bind(this)} />;
    const loading = (this.state.loading || this.state.error) && <Loading error={this.state.error} />;
    const posts = this.state.posts.map((post, index) => {
      return (
        <li key={post._id}>
          <Post id={post._id}
                humanId={post.humanId}
                text={post.text}
                createdAt={post.createdAt}
                isOp={post._id === this.state.op} />
        </li>
      );
    });
    return (
      <>
        <ul className='unstyled posts'>
          {posts.length !== 0 && [...posts, form]}
        </ul>
        {loading}
      </>
    );
  }
}

export default Thread;