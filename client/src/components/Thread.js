import React, { Component } from 'react';
import { formatDate } from '../utils/date';

import PostForm from './PostForm';
import Loading from './Loading';

function Post(props) {
  const date = new Date(props.createdAt);
  const humanId = props.humanId || 'nothing';
  return (
    <div className='post floaty'>
     <div className='postMetadata'>
      <a href='#' className='postId'>
       <span>{humanId}</span>
      </a>
      &nbsp;
      <span className='postTimestamp'>{formatDate(date)}</span>
     </div>
     <span className='postText'> {props.text} </span>
    </div>
  );
}

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      posts: [],
      loading: false
    }

    this.addPost = this.addPost.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetch(`/api/thread/${this.state.id}`)
    .then(res => res.json())
    .then(res => this.setState({ posts: res.data.posts, loading: false }));
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
    .then(res => this.setState({ posts: [...this.state.posts, res.post], loading: false }));
  }

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <li key={post._id}>
         <Post id={post._id} humanId={post.humanId} text={post.text} createdAt={post.createdAt}/>
        </li>
      );
    }).reverse();
    return (
      <>
        <PostForm id={this.state.id} addPost={this.addPost} />
        <ul className='unstyled posts'> {this.state.loading && <Loading />} {posts} </ul>
      </>
    );
  }
}

export default Thread;