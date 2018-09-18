import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import validate from './validate';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from "@material-ui/core/Paper/index";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { updateReviewItem } from '../../../redux/actions/reviews';

import StyledTextField from '../../StyledTextField';
import Toast from '../../Toast';
import ImageUploader from '../../ImageUploader'
import Spinner from '../../Spinner';

import idx from 'idx';

const MAX_UPLOADED_FILE_SIZE = 1024 * 1024 * 2;
const baseURL = process.env.NODE_ENV === 'production' ? 'http://37.140.198.199:3000' : 'http://localhost:3000';

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

const Comments = styled(Paper)`
  padding: 5px;
  max-height: 300px;
  overflow: auto;
`;

const FormRow = styled.div`
  margin-bottom: 20px;
  &.hasicon {
    display: flex;
    flex-direction: row;
  }
  &.name {
    width: 50%;
  }
`;

const Comment = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
`;

const NoComments = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #bb6258;
`;

const OrderWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const renderComments = ({ fields, meta: { error } }) => (
  <div>
    {!fields.length && <NoComments>Комментариев пока нет</NoComments>}
    {fields.map((point, index) => (
      <Comment key={index}>
        <div style={{width: '100%'}}>
          <FormRow className="name">
            <Field
              name={`${point}.name`}
              label={'Имя'}
              type="text"
              component={StyledTextField}
            />
          </FormRow>
          <FormRow>
            <Field
              name={`${point}.comment`}
              label={'Комментарий'}
              type="text"
              fieldProps={{
                multiline: true,
                inputProps: {
                  maxLength: 1000
                },
              }}
              component={StyledTextField}
            />
          </FormRow>
        </div>
        <IconButton style={{flex: 'none'}} aria-label="Delete" onClick={() => fields.remove(index)}>
          <Icon>delete</Icon>
        </IconButton>
      </Comment>
    ))}
    <Button size="small" variant="contained" onClick={() => fields.push()} color="primary">
      Добавить
    </Button>
    {/*{error && <div className="error">{error}</div>}*/}
  </div>
);

class EditReviewDialog extends React.Component {
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
  };

  submitForm = async (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append('comments', JSON.stringify(values.comments));
    bodyFormData.append('link', values.link);
    bodyFormData.append('order', values.order);
    if (values.image && values.image[0]) {
      bodyFormData.append('reviewImage', values.image[0]);
    } else if (idx(this, _ => _.state.previewObj.preview)) {
      bodyFormData.append('imageLink', this.state.previewObj.preview);
    }
    this.setState({ submitting: true });
    try {
      await this.props.updateReviewItem(this.props.review._id, bodyFormData);
      this.setState({
        toastType: 'success',
        toastMessage: 'Отзыв успешно обновлен',
        openToast: true,
        open: false,
        submitting: false,
      });
      this.props.handleClose();
    } catch(error) {
      console.log('UPDATE REVIEW ITEM ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке обновить отзыв';
      this.setState({
        toastType: 'alert',
        toastMessage: errMsg,
        openToast: true,
        open: false,
        submitting: false,
      });
    }
  };

  render() {
    const {
      review,
      open,
      handleClose,
      handleSubmit,
      valid,
      dirty,
      formValues
    } = this.props;
    const { openToast, toastMessage, toastType, submitting } = this.state;

    const previewObj = review ? { preview: baseURL + review.image } : '';
    const hasImage = (formValues && formValues.image) || previewObj && previewObj.preview;

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
          <form onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Редактировать отзыв</StyledDialogTitle>
            <DialogContent>
              <FieldWrap>
                <Field
                  previewObj={previewObj}
                  label='Изображение'
                  name="image"
                  type="file"
                  component={ImageUploader}
                  dropzoneProps={{
                    multiple: false,
                    maxSize: MAX_UPLOADED_FILE_SIZE,
                    accept: '.jpg, .png',
                  }}
                  noticeText={'Разрешена загрузка файлов с расширением jpeg, jpg и png. Размер файла не должен превышать 2Мб'}
                />
              </FieldWrap>
              <FormRow>
                <Field
                  name="link"
                  label="Ссылка на отзыв в instagram"
                  type="text"
                  component={StyledTextField}
                  fieldProps={{
                    inputProps: { ref: (c) => {this.link = c} },
                  }}
                />
              </FormRow>
              <Comments>
                <FieldArray name="comments" component={renderComments} />
              </Comments>
            </DialogContent>
            <DialogActions>
              <OrderWrap>
                <div style={{width: '152px', paddingLeft: '5px', marginTop: '-15px'}}>
                  <Field
                    label="Порядковый номер"
                    name="order"
                    type="text"
                    component={StyledTextField}
                  />
                </div>
              </OrderWrap>
              <Button onClick={handleClose} color="primary">
                Отмена
              </Button>
              <Button type="submit" color="primary" disabled={!dirty || submitting || !valid || !hasImage}>
                Сохранить
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    formValues: idx(state, _ => _.form.editReviewForm.values),
    initialValues: {
      order: idx(ownProps, _ => _.review.order),
      link: idx(ownProps, _ => _.review.link),
      comments: idx(ownProps, _ => _.review.comments),
    }
  }
};

export default compose(
  connect(
    mapStateToProps,
    { updateReviewItem }
  ),
  reduxForm({
    form: 'editReviewForm',
    validate,
    enableReinitialize: true,
  })
)(EditReviewDialog);