import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {Router, Route, Switch} from 'react-router';
import history from './history';
import './globalStyles';
import LoginPage from './components/LoginPage'
import createApiInstance from './utils/api';

createApiInstance();

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
