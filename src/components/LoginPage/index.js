import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { compose } from 'redux';

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
  background: url("https://www.toptal.com/designers/subtlepatterns/patterns/doodles.png");
`;

const Content = styled.div`
  width: 400px;
`;

const LoginForm = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 300px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
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
    // const { login } = this.props;
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
              <div>
                <Field name='password' component='input' type='text'/>
              </div>

              <div>



                <Field name='email' component={props => {
                  const {input, meta, ...rest} = props;
                  return (
                    <TextField
                      {...input}
                      {...rest}
                      error={false}
                      label="Адрес эл.почты"
                      // value={props.value}
                      margin="normal"
                      helperText="Здесь будет сообщение об ошибке"
                    />
                  )
                }} type='text'/>





                
              </div>





              <div>
                <Button type='submit' variant="contained" color="primary">
                  Submit
                </Button>
              </div>
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
    // validate,
    enableReinitialize: true,
  }),
  // connect(null, { login })
)(LoginPage);
