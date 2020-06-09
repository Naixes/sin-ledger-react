import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './cintainers/Home';
import Create from './cintainers/Create';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home}></Route>
        <Route path="/create" component={Create}></Route>
      </div>
    </Router>
  );
}

export default App;
