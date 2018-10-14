import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import history from './history';
import './globalStyles';
import LoginPage from './components/LoginPage'
import createApiInstance from './utils/api';
import PrivateRoute from './components/PrivateRoute';
import AppContainer from './components/AppContainer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// Pages
import UsersPage from './components/UsersPage';
import ContentPage from './components/ContentPage';
import NewsPage from './components/NewsPage';
import ReviewsPage from './components/ReviewsPage';
import FaqPage from './components/FaqPage';
import PartnersPage from './components/PartnersPage';
import DocsPage from './components/DocsPage';

createApiInstance();

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store()}>
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute component={AppContainer}>
                <Switch>
                  <Route exact path="/" component={() => (<div>раздел находится в разработке</div>)} />
                  <Route exact path="/content" component={ContentPage} />
                  <Route exact path="/users" component={UsersPage} />
                  <Route exact path="/news" component={NewsPage} />
                  <Route exact path="/reviews" component={ReviewsPage} />
                  <Route exact path="/faq" component={FaqPage} />
                  <Route exact path="/partners" component={PartnersPage} />
                  <Route exact path="/documents" component={DocsPage} />
                </Switch>
              </PrivateRoute>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
