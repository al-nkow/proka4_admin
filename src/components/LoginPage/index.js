import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router';
// import queryString from 'query-string';
//
// import { primary } from '../../shared/colors';
// import Logo from '../shared/Logo';
// import LoginForm from './LoginForm';
// import { verifyToken } from '../../redux/actions/currentUser/api';
// import Toast from '../shared/Toast';
//
// import Breakpoints from '../../shared/media-breakpoints';
// import {
//   defineMessages,
//   FormattedMessage,
//   injectIntl,
//   intlShape,
// } from 'react-intl';


class LoginPage extends PureComponent {
  // state = { isVerifyEmailNoticeOpened: false };
  //
  // handleClose = (event, reason) => {
  //   if (reason === 'clickaway') return;
  //   this.setState({ isVerifyEmailNoticeOpened: false });
  // };
  //
  // componentDidMount() {
  //   const params = queryString.parse(this.props.location.search);
  //
  //   if (params.token) {
  //     verifyToken(params.token)
  //       .then(res => {
  //         this.setState({ isVerifyEmailNoticeOpened: true });
  //       })
  //       .catch(err => {
  //         console.log('VERIFY TOKEN ERROR: ', err);
  //       });
  //   }
  // }

  render() {
    // const { isVerifyEmailNoticeOpened } = this.state;
    // const { formatMessage } = this.props.intl;
    return (
      <div>
        <h1>LOGIN</h1>
      {/*<Wrapper>*/}
        {/*<StyledLogo />*/}
        {/*<LoginForm />*/}
        {/*<Footer>*/}
          {/*<FormattedMessage {...messages.title1} />{' '}*/}
          {/*<StyledLink to="/signup">*/}
            {/*<FormattedMessage {...messages.title2} />*/}
          {/*</StyledLink>*/}
        {/*</Footer>*/}
        {/*<Toast*/}
          {/*title={formatMessage(messages.verified)}*/}
          {/*isVerifyEmailNoticeOpened={isVerifyEmailNoticeOpened}*/}
          {/*handleClose={this.handleClose}*/}
          {/*duration={3000}*/}
        {/*/>*/}
      {/*</Wrapper>*/}
      </div>
    );
  }
}

// LoginPage.propTypes = {
//   intl: intlShape.isRequired,
// };
// export default withRouter(injectIntl(LoginPage));

export default LoginPage;
