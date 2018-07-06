import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import validate from "../../LoginPage/validate";
import StyledPasswordField from "../../StyledPasswordField";
import StyledTextField from "../../StyledTextField";
import styled from 'styled-components';
import { signupNewUser } from '../../../redux/actions/users';

const FieldWrap = styled.div`
  margin-bottom: 20px;
`;

class SimpleDialog extends React.Component {
  state = {
    open: false,
  };

  submitForm = async (values) => {
    try {
      const result = await this.props.signupNewUser(values);
      console.log('TRYCATCH RESULT: ', result);
    } catch(error) {
      console.log('TRYCATCH ERROR: ', error.response);
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const {
      handleSubmit,
      submitting,
      dirty,
      valid,
    } = this.props;


    return (
      <div>
        {/*<Button onClick={this.handleClickOpen}>Open form dialog</Button>*/}
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Добавить пользователя
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(this.submitForm)}>
            <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Some text here some text here some text here some text here some text here some text here
              </DialogContentText>
                <FieldWrap>
                  <Field name='email' label='Адрес эл.почты' type='text' component={StyledTextField} />
                </FieldWrap>
                <FieldWrap>
                  <Field name='password' label='Пароль' type='text' component={StyledTextField} />
                </FieldWrap>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add user
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

// export default SimpleDialog;

export default compose(
  connect(
    null,
    // (state, ownProps) => ({
    //   initialValues: {
    //     description: ownProps.data ? ownProps.data.description : '',
    //   },
    // }),
    { signupNewUser }
  ),
  reduxForm({
    form: 'addUserForm',
    validate,
    enableReinitialize: true,
  })
)(SimpleDialog);