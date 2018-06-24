import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

const Block = styled.div`
  padding: 20px;
  border: 1px solid red;
  margin: 20px;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Block>Hello!!</Block>
      </div>
    );
  }
}

export default App;
