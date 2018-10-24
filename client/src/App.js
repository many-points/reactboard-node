import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
        <Route exact path='/thread/:id' render={renderThread} />
       </div>
     </Router>
    );
  }
}

export default App;
