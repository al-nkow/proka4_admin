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

import { createNewsItem } from '../../../redux/actions/news';

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

class AddNewsDialog extends React.Component {
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
    const bodyFormData = new FormData();
    bodyFormData.append('date', moment(values.date).utc().format());
    bodyFormData.append('title', values.title);
    bodyFormData.append('newsImage', values.image[0]);
    // Show FormData content:
    // for (var key of bodyFormData.entries()) {
    //   console.log(key[0] + ', ' + key[1])
    // }
    this.setState({ submitting: true });
    try {
      await this.props.createNewsItem(bodyFormData);
      this.setState({
        toastType: 'success',
        toastMessage: 'Новость успешно создана',
        openToast: true,
        open: false,
        submitting: false,
      });
      this.props.dispatch(reset('addNewsForm'));
    } catch(error) {
      console.log('CREATE NEWS ITEM ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке создать новость';
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
    this.props.dispatch(reset('addNewsForm'));
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
          Добавить новость
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
          <form onSubmit={handleSubmit(this.submitForm)}>
            <StyledDialogTitle id="form-dialog-title">Добавить новость</StyledDialogTitle>
            <DialogContent>
              <DialogContentText style={{marginBottom: '20px'}}>
                Чтобы загрузить изображение нажмите на кнопку или перетащите изображение в область загрузки
              </DialogContentText>
              <FieldWrap>
                <Field
                  previewObj={''}
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
              <FieldWrap>
                <Field name='date' label='Дата' type='datetime-local' labelProps={{ shrink: true }} component={StyledTextField} />
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

const mapStateToProps = state => {
    const CurrentDate = moment().format('YYYY-MM-DDTHH:mm');
    return {
      stateObj: state,
      initialValues: {
        date: CurrentDate,
        image: null,
        title: null
    }
  }
};

export default compose(
  connect(
    mapStateToProps,
    { createNewsItem }
  ),
  reduxForm({
    form: 'addNewsForm',
    validate,
    enableReinitialize: true,
  })
)(AddNewsDialog);