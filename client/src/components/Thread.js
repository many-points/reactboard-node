import React, { Component } from 'react';
import { formatDate } from '../utils/date';

function Post(props) {
  const date = new Date(props.createdAt);
  return (
    <div className='post floaty'>
     <div className='postMetadata'>
      <a href='#' className='postId'>
       <span>{props.id}</span>
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
      posts: []
    }
  }

  componentDidMount() {
    this.props.getThreadData(this.state.id)
    .then((res) => this.setState({ posts: res.data.posts }));
  }

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <li key={post._id}>
         <Post id={post._id} text={post.text} createdAt={post.createdAt}/>
        </li>
      );
    });
    return (
      <ul className='unstyled'> {posts} </ul>
    );
  }
}

export default Thread;