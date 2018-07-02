import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from './validate';

import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { compose } from 'redux';

import login from '../../redux/actions/login';

import StyledTextField from '../StyledTextField';
import StyledPasswordField from '../StyledPasswordField';

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //background: url("https://www.toptal.com/designers/subtlepatterns/patterns/doodles.png");
  background: -webkit-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -o-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -ms-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -moz-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: linear-gradient(91deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
`;

const Content = styled.div`
  width: 400px;
`;

const LoginForm = styled.div`
  padding: 20px;
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

const FieldWrap = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  padding: 20px 0; 
`;

const StyledButton = styled(Button)`
  font-weight: 300;
  width: 100%;
`;


class LoginPage extends PureComponent {
  state = {
    name: 'somemail@mail.com'
  };
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

  onSubmit = values => {
    console.log('>>>>>>', values);
    const { login } = this.props;
    login(values);

    // return login(values).then(res => {
    //   if (res && res.is2fa) {
    //     this.setState({ is2faDialogOpen: true, token2fa: res.token });
    //   }
    // });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    // const { isVerifyEmailNoticeOpened } = this.state;
    // const { formatMessage } = this.props.intl;
    const { handleSubmit, error, submitting, valid } = this.props;

    return (
      <Wrapper>
        <Content>
          <LoginForm>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <FieldWrap>
                <Field name='email' label='Адрес эл.почты' type='text' component={StyledTextField} />
              </FieldWrap>
              <FieldWrap>
                <Field name='password' label='Пароль' type='text' component={StyledPasswordField} />
              </FieldWrap>
              <ButtonWrap>
                <StyledButton type='submit' variant="contained" color="primary" disabled={submitting || !valid}>
                  Отправить
                </StyledButton>
              </ButtonWrap>
            </form>
          </LoginForm>
        </Content>
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
      </Wrapper>
    );
  }
}

// LoginPage.propTypes = {
//   intl: intlShape.isRequired,
// };
// export default withRouter(injectIntl(LoginPage));

// export default LoginPage;

export default compose(
  reduxForm({
    form: 'loginForm',
    fields: ['email', 'password'],
    validate,
    enableReinitialize: true,
  }),
  connect(null, { login })
)(LoginPage);
