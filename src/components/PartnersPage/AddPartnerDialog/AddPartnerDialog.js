import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import { createPartnerItem } from '../../../redux/actions/partners';

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

class AddPartnerDialog extends React.Component {
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
    bodyFormData.append('link', values.link);
    bodyFormData.append('partnerImage', values.image[0]);
    this.setState({ submitting: true });
    try {
      await this.props.createPartnerItem(bodyFormData);
      this.setState({
        toastType: 'success',
        toastMessage: 'Новый партнёр успешно добавлен',
        openToast: true,
        open: false,
        submitting: false,
      });
      this.props.dispatch(reset('addPartnerForm'));
    } catch(error) {
      console.log('CREATE NEWS ITEM ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке создать партнёра';
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
    this.props.dispatch(reset('addPartnerForm'));
  };

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
          Добавить партнёра
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
            <StyledDialogTitle id="form-dialog-title">Добавить партнёра</StyledDialogTitle>
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
                <Field
                  name="link"
                  label="Ссылка на сайт партнёра"
                  type="text"
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
  return {
    stateObj: state,
    initialValues: {
      image: null,
      link: null
    }
  }
};

export default compose(
  connect(
    mapStateToProps,
    { createPartnerItem }
  ),
  reduxForm({
    form: 'addPartnerForm',
    validate,
    enableReinitialize: true,
  })
)(AddPartnerDialog);