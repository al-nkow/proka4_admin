import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import idx from 'idx';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import validate from './validate';
import StyledTextField from '../../StyledTextField';
import Spinner from '../../Spinner';
import { updateNewsItem } from '../../../redux/actions/news';
import Toast from '../../Toast';
import ImageUploader from '../../ImageUploader'

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

class EditNewsDialog extends React.Component {
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
    bodyFormData.append('date', moment(values.date).utc().format());
    bodyFormData.append('title', values.title);
    bodyFormData.append('link', values.link);
    if (values.image) bodyFormData.append('newsImage', values.image[0]);
    this.setState({ submitting: true });
    try {
      await this.props.updateNewsItem(this.props.news._id, bodyFormData);
      this.setState({
        toastType: 'success',
        toastMessage: 'Новость успешно обновлена',
        openToast: true,
        submitting: false
      });
      this.props.handleClose();
    } catch(error) {
      console.log('CREATE NEWS ITEM ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке изменить новость';
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
      dirty,
      news,
    } = this.props;

    const { openToast, toastMessage, toastType, submitting } = this.state;
    const previewObj = news ? { preview: baseURL + news.image } : '';

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
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          { submitting && <Spinner abs={true} /> }
          <form onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Редактировать новость</StyledDialogTitle>
            <DialogContent>
              <FieldWrap>
                <Field
                  label='Изображение'
                  name="image"
                  type="file"
                  component={ImageUploader}
                  previewObj={previewObj}
                  dropzoneProps={{
                    multiple: false,
                    maxSize: MAX_UPLOADED_FILE_SIZE,
                    accept: '.jpg, .png',
                  }}
                  noticeText={'Разрешена загрузка файлов с расширением jpeg, jpg и png. Размер файла не должен превышать 2Мб'}
                />
              </FieldWrap>
              <FieldWrap>
                <Field name='date' label='Дата' type='datetime-local' labelProps={{ shrink: true }} component={StyledTextField} />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="link"
                  label="Ссылка на новость"
                  type="text"
                  component={StyledTextField}
                />
              </FieldWrap>
              <FieldWrap>
                <Field
                  name="title"
                  label="Заголовок новости"
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
              <Button onClick={this.props.handleClose} color="primary">
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

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    date: moment(new Date(idx(ownProps, _ => _.news.date))).format('YYYY-MM-DDTHH:mm'),
    title: idx(ownProps, _ => _.news.title),
    link: idx(ownProps, _ => _.news.link),
  }
});

export default compose(
  connect(
    mapStateToProps,
    { updateNewsItem }
  ),
  reduxForm({
    form: 'editNewsForm',
    validate,
    enableReinitialize: true,
  })
)(EditNewsDialog);