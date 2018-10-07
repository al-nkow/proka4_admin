import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import validate from './validate';
import login from '../../redux/actions/login';
import StyledTextField from '../StyledTextField';
import StyledPasswordField from '../StyledPasswordField';
import idx from 'idx';

import {
  Wrapper,
  Content,
  LoginForm,
  FieldWrap,
  ButtonWrap,
  StyledButton,
  ErrorMessage
} from './parts';

class LoginPage extends PureComponent {
  state = {
    loginError: '',
    name: 'somemail@mail.com'
  };

  // componentDidMount() {
  //   const params = queryString.parse(this.props.location.search);
  // }

  showError = (status) => {
    let error = 'Вход в систему невозможен. Ошибка сервера.';
    if (status === 401) error = 'Вход в систему невозможен. Проверьте правильность адреса эл. почты и пароля.';
    this.setState({ loginError: error });
    setTimeout(() => this.setState({ loginError: '' }), 3000);
  };

  onSubmit = values => {
    const { login } = this.props;
    login(values).catch((err) => {
      console.log('LOGIN ERROR: ', err);
      const errorText = idx(err, _ => _.response.text) || 'Ошибка';
      this.showError(errorText);
    });
  };

  render() {
    const { loginError } = this.state;
    const { handleSubmit, submitting, valid } = this.props;

    return (
      <Wrapper>
        <Content>
          <LoginForm>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
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
      </Wrapper>
    );
  }
}

export default compose(
  reduxForm({
    form: 'loginForm',
    fields: ['email', 'password'],
    validate,
    enableReinitialize: true,
  }),
  connect(null, { login })
)(LoginPage);
