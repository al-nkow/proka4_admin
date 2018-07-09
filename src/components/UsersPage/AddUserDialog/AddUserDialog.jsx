import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import validate from "../../LoginPage/validate";
import StyledTextField from "../../StyledTextField";
import styled from 'styled-components';
import { signupNewUser } from '../../../redux/actions/users';
import Toast from '../../Toast';

const FieldWrap = styled.div`
  margin-bottom: 20px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    h2 {
      font-size: 20px;
      color: #333333;
      font-weight: 400;
    }
  }
`;

class AddUserDialog extends React.Component {
  state = {
    open: false,
    openToast: false,
    toastMessage: '',
    toastType: ''
  };

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  submitForm = async (values) => {
    try {
      await this.props.signupNewUser(values);
      this.setState({
        toastType: 'success',
        toastMessage: 'Пользователь успешно добавлен в систему',
        openToast: true,
        open: false
      });
      this.props.dispatch(reset('addUserForm'));
    } catch(error) {
      console.log('SIGN UP NEW USER ERROR: ', error.response);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при попытке создать пользователя',
        openToast: true,
        open: false
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch(reset('addUserForm'));
  };

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
      dirty,
    } = this.props;

    const { openToast, toastMessage, toastType } = this.state;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Добавить пользователя
        </Button>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Добавить пользователя в систему</StyledDialogTitle>
            <DialogContent>
              {/*<DialogContentText>*/}
                {/*Заполните поля ниже чтобы добавить пользователя в систему.*/}
              {/*</DialogContentText>*/}
                <FieldWrap>
                  <Field name='email' label='Адрес эл.почты' type='text' component={StyledTextField} />
                </FieldWrap>
                <FieldWrap>
                  <Field name='password' label='Пароль' type='text' component={StyledTextField} />
                </FieldWrap>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Отмена
              </Button>
              <Button type="submit" color="primary" disabled={!dirty || submitting || !valid}>
                Сохранить
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { signupNewUser }
  ),
  reduxForm({
    form: 'addUserForm',
    validate,
    enableReinitialize: true,
  })
)(AddUserDialog);