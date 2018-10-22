import React, { Component } from 'react';

function Post(props) {
  return (
    <div className='post'>
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
        <li key={index}>
          <Post text={post.text} />
        </li>
      );
    });
    return (
      <ul className='unstyled'> {posts} </ul>
    );
  }
}

export default Thread;