import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import styled from 'styled-components'
import {Router, Route, Switch} from 'react-router';
import history from './history';
import './globalStyles';
import LoginPage from './components/LoginPage'

const Block = styled.div`
  padding: 20px;
  border: 1px solid red;
  margin: 20px;
`;

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store()}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
