import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Thread from './components/Thread';

import './App.css';

class App extends Component {
  render() {
    const renderThread = (props) => {
      return <Thread id={props.match.params.id} />;
    }

    return (
      <Router>
        <div className='container'>
          {/* Temporary redirect */}
          <Route exact path='/' render={() => <Redirect to='/thread/5bcca0db8c9b5219d6102f75' />} />
          <Route exact path='/thread/:id' render={renderThread} />
        </div>
      </Router>
    );
  }
}

export default App;
