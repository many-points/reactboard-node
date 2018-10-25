import React, { Component } from 'react';

import Post from './Post';
import Loading from './Loading';

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      loading: false,
      error: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetch(`/api/thread`)
    .then(res => res.json())
    .then(res => this.setState({ threads: res.data, loading: false }))
    .catch(error => {
      console.error(error);
      setTimeout(() => this.setState({error: true}));
    });
  }

  render() {
    const loading = this.state.loading, error = this.state.error;
    const threads = this.state.threads.map((thread, index) => {
      return (
        <li key={thread._id}>
          <Post id={thread.op._id}
                humanId={thread.op.humanId}
                text={thread.op.text}
                createdAt={thread.op.createdAt} />
        </li>
      );
    }).reverse();;
    return (
      <>
        <ul className='unstyled posts'>{(loading || error) && <Loading error={error} />}{threads}</ul>
      </>
    );
  }
}

export default ThreadList;