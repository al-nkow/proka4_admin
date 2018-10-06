import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import { createQuestionItem } from '../../../redux/actions/faq';

import validate from './validate';
import StyledTextField from '../../StyledTextField';
import Toast from '../../Toast';
import ImageUploader from '../../ImageUploader'
import Spinner from '../../Spinner';

const MAX_UPLOADED_FILE_SIZE = 1024 * 1024 * 2;

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

class AddQuestionDialog extends React.Component {
  state = {
    open: false,
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
  };










  submitForm = async (values) => {
    this.setState({ submitting: true });
    try {
      await this.props.createQuestionItem(values);
      this.setState({
        toastType: 'success',
        toastMessage: 'Новый вопрос успешно создан',
        openToast: true,
        open: false,
        submitting: false,
      });
      this.props.dispatch(reset('addQuestionForm'));
    } catch(error) {
      console.log('CREATE QUESTION ITEM ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке создать вопрос';
      this.setState({
        toastType: 'alert',
        toastMessage: errMsg,
        openToast: true,
        open: false,
        submitting: false,
      });
    }
  };













  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch(reset('addQuestionForm'));
  };

  // componentDidMount() {
  //   this.props.dispatch(change('addNewsForm', 'title', ''));
  //   this.props.dispatch(change('addNewsForm', 'image', null));
  // }

  render() {
    const {
      handleSubmit,
      valid,
      dirty
    } = this.props;

    const { openToast, toastMessage, toastType, submitting } = this.state;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Добавить вопрос
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
          { submitting && <Spinner abs={true} /> }
          <FormBlock onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Добавить вопрос</StyledDialogTitle>
            <DialogContent>
              <FieldWrap>
                <Field
                  name="question"
                  label="Вопрос"
                  type="text"
                  component={StyledTextField}
                />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="answer"
                  label="Ответ"
                  type="text"
                  fieldProps={{
                    multiline: true,
                    inputProps: { maxLength: 300 },
                  }}
                  component={StyledTextField}
                />
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
          </FormBlock>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stateObj: state,
    initialValues: {
      answer: null,
      question: null
    }
  }
};

export default compose(
  connect(
    mapStateToProps,
    { createQuestionItem }
  ),
  reduxForm({
    form: 'addQuestionForm',
    validate,
    enableReinitialize: true,
  })
)(AddQuestionDialog);