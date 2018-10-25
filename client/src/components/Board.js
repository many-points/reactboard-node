import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetch from '../utils/timeout';

import Form from './Form';
import Post from './Post';
import Loading from './Loading';

class Board extends Component {
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

  addThread(data) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    }
    this.setState({ loading: true });
    return fetch(`/api/thread`, request)
    .then(res => res.json())
    .then(res => {
      console.log(request.body)
      if(res.success === false) throw Error('Request failed');
      this.setState({ threads: [...this.state.threads, res.thread], loading: false },
        () => window.scrollTo(0, document.body.scrollHeight));
    })
    .catch(error => {
      setTimeout(() => this.setState({error: true}));
    });
  }

  render() {
    const form = <Form key='form' id={this.state.id} submit={this.addThread.bind(this)} threadForm={true}/>;
    const loading = (this.state.loading || this.state.error) && <Loading error={this.state.error} />;
    const threads = this.state.threads.map((thread, index) => {
      return (
        <li key={thread._id}>
          <Post 
            id={thread.op._id}
            humanId={thread.op.humanId}
            text={thread.op.text}
            createdAt={thread.op.createdAt}
            isThread={true}
            linkTo={thread._id}
            threadUpdatedAt={thread.updatedAt}
          />
        </li>
      );
    });
    return (
      <>
        <ul className='unstyled posts'>
          {threads.length !== 0 && [...threads, form]}
        </ul>
        {loading}
      </>
    );
  }
}

export default Board;