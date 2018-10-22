import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Thread from './components/Thread';

import './App.css';

class App extends Component {
  getThreadData(id) {
    return fetch(`/api/thread/${id}`).then(res => res.json());
  }

  render() {
    return (
     <Router>
      <div className='App'>
       <div className='container'>
        <Route exact path='/thread/:id'
         render={ (props) =>
          <Thread id={props.match.params.id}
           getThreadData={this.getThreadData} /> }
        />
       </div>
      </div>
     </Router>
    );
  }
}

export default App;
