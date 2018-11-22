import React, { Component } from 'react';
import Nav from './components/Nav';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav></Nav>
        <Main></Main>
      </div>
    );
  }
}

export default App;
