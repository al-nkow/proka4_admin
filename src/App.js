import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {Router, Route, Switch} from 'react-router';
import history from './history';
import './globalStyles';
import LoginPage from './components/LoginPage'
import createApiInstance from './utils/api';
import PrivateRoute from './components/PrivateRoute';
import AppContainer from './components/AppContainer';
import UsersPage from './components/UsersPage';

createApiInstance();

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store()}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute component={AppContainer}>
              <Switch>
                <Route exact path="/" component={() => (<div>test</div>)} />
                <Route exact path="/users" component={UsersPage} />
              </Switch>
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
