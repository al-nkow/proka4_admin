import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Field, reduxForm, reset} from 'redux-form';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { changePassword } from '../../../redux/actions/users';

import validate from './validate';
import StyledPasswordField from '../../StyledPasswordField';
import Toast from '../../Toast';
import Spinner from '../../Spinner';

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

const FormBlock = styled.form`
  min-width: 400px;
`;

class ChangePasswordDialog extends React.Component {
  state = {
    openToast: false,
    toastMessage: '',
    toastType: '',
    submitting: false,
  };

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
    this.props.dispatch(reset('changePasswordForm'));
  };

  submitForm = async (values) => {
    const data = {
      password: values.password,
      newpassword: values.newpassword,
      id: this.props.user._id
    };
    this.setState({ submitting: true });
    try {
      await this.props.changePassword(data);
      this.setState({
        toastType: 'success',
        toastMessage: 'Пароль успешно изменён',
        openToast: true,
        submitting: false,
      });
      this.props.handleClose();
    } catch(error) {
      console.log('UPDATE QUESTION ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке изменить пароль';
      this.setState({
        toastType: 'alert',
        toastMessage: errMsg,
        openToast: true,
        submitting: false,
      });
      this.props.handleClose();
    }
  };

  render() {
    const {
      handleSubmit,
      valid,
      dirty
    } = this.props;

    const { openToast, toastMessage, toastType, submitting } = this.state;
    const { open, handleClose } = this.props;

    return (
      <div>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          { submitting && <Spinner abs={true} /> }
          <FormBlock onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Изменить пароль</StyledDialogTitle>
            <DialogContent>
              <FieldWrap>
                <Field
                  name="password"
                  label="Пароль"
                  type="text"
                  component={StyledPasswordField}
                />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="newpassword"
                  label="Новый пароль"
                  type="text"
                  component={StyledPasswordField}
                />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="newpasswordagain"
                  label="Новый пароль еще раз"
                  type="text"
                  component={StyledPasswordField}
                />
              </FieldWrap>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Отмена
              </Button>
              <Button type="submit" color="primary" disabled={!dirty || submitting || !valid}>
                Сохранить
              </Button>
            </DialogActions>
          </FormBlock>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stateObj: state,
  }
};

export default compose(
  connect(
    mapStateToProps,
    { changePassword }
  ),
  reduxForm({
    form: 'changePasswordForm',
    validate,
    enableReinitialize: true,
  })
)(ChangePasswordDialog);