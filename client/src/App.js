import React, { Component } from 'react';
import { BrowserRouter, ServerRouter, Route, Redirect } from 'react-router-dom';

import Thread from './components/Thread';
import Board from './components/Board';

import './App.css';

export default class App extends Component {
  render() {
    const renderThread = (props) => {
      return <Thread id={props.match.params.id} />;
    }
    const renderThreadList = (props) => {
      return <Board />;
    }

    return (
      <ServerRouter>
        <div className='container'>
          <Route exact path='/' render={renderThreadList} />
          <Route exact path='/thread/:id' render={renderThread} />
        </div>
      </ServerRouter>
    );
  }
}
