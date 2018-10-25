import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Thread from './components/Thread';
import ThreadList from './components/ThreadList';

import './App.css';

class App extends Component {
  render() {
    const renderThread = (props) => {
      return <Thread id={props.match.params.id} />;
    }
    const renderThreadList = (props) => {
      return <ThreadList />;
    }

    return (
      <Router>
        <div className='container'>
          <Route exact path='/' render={renderThreadList} />
          <Route exact path='/thread/:id' render={renderThread} />
        </div>
      </Router>
    );
  }
}

export default App;
