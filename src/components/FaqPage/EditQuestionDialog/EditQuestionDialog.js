import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { updateQuestion } from '../../../redux/actions/faq';

import validate from './validate';
import StyledTextField from '../../StyledTextField';
import Toast from '../../Toast';
import Spinner from '../../Spinner';
import idx from "idx/lib/idx";

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

class EditQuestionDialog extends React.Component {
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
      await this.props.updateQuestion(this.props.question._id, values);
      this.setState({
        toastType: 'success',
        toastMessage: 'Вопрос успешно отредактитрован',
        openToast: true,
        submitting: false,
      });
      this.props.handleClose();
    } catch(error) {
      console.log('UPDATE QUESTION ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке изменить вопрос';
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
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          { submitting && <Spinner abs={true} /> }
          <FormBlock onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Редактировать вопрос</StyledDialogTitle>
            <DialogContent>
              <FieldWrap>
                <Field
                  name="question"
                  label="Вопрос"
                  type="text"
                  fieldProps={{
                    multiline: true,
                    inputProps: { maxLength: 1000 },
                  }}
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
                    inputProps: { maxLength: 1000 },
                  }}
                  component={StyledTextField}
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

const mapStateToProps = (state, ownProps) => {
  return {
    stateObj: state,
    initialValues: {
      answer: idx(ownProps, _ => _.question.answer),
      question: idx(ownProps, _ => _.question.question)
    }
  }
};

export default compose(
  connect(
    mapStateToProps,
    { updateQuestion }
  ),
  reduxForm({
    form: 'editQuestionForm',
    validate,
    enableReinitialize: true,
  })
)(EditQuestionDialog);