import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper/index';
import ImageUploader from '../../ImageUploader'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import StyledTextField from '../../StyledTextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import idx from 'idx';
import { createReviewItem } from '../../../redux/actions/reviews';
const MAX_UPLOADED_FILE_SIZE = 1024 * 1024 * 2;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`;
const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1400px) {
    max-width: 600px;
  }
`;
const LeftCol = styled.div`
  width: 200px;
  flex: none;
  padding-right: 10px;
`;
const RightCol = styled.div`
  padding-left: 10px;
  width: 100%;
`;
const Comments = styled(Paper)`
  padding: 5px;
  max-height: 300px;
  overflow: auto;
`;
export const FormRow = styled.div`
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
const Footer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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
    {error && <div className="error">{error}</div>}
  </div>
);



class Review extends Component {

  state = {
    previewObj: ''
  };

  getReviewsFromInstagram = async () => {
    try {
      const resp = await fetch(`https://api.instagram.com/oembed/?url=${this.link.value}`);
      const post = await resp.json();

      if (!post) return;

      this.setState({ previewObj: { preview: post.thumbnail_url }});
      let counter = 0;

      if (post.title) {
        counter += 1;
        this.props.dispatch(change(this.props.form, `comments[0].name`, post.author_name));
        this.props.dispatch(change(this.props.form, `comments[0].comment`, post.title));
      }

      const respComm = await fetch(`https://api.instagram.com/v1/media/${post.media_id}/comments?access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`);
      const comments = await respComm.json();

      if (comments && comments.data && comments.data.length) {
        comments.data.forEach((item, i) => {
          this.props.dispatch(change(this.props.form, `comments[${i + counter}].name`, item.from.username));
          this.props.dispatch(change(this.props.form, `comments[${i + counter}].comment`, item.text));
        });
      }

    } catch(err) {
      console.log('GET INSTAGRAM REVIEWS ERROR: ', err);
    }
  };













  submitForm = async (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append('comments', JSON.stringify(values.comments));
    bodyFormData.append('link', values.link);
    if (idx(this, _ => _.state.previewObj.preview)) bodyFormData.append('imageLink', this.state.previewObj.preview);

    // send to server createReviewItem
    try {
      await this.props.createReviewItem(bodyFormData);
      // this.setState({
      //   toastType: 'success',
      //   toastMessage: 'Новость успешно создана',
      //   openToast: true,
      //   open: false,
      //   submitting: false,
      // });
      // this.props.dispatch(reset('addNewsForm'));
    } catch(error) {
      console.log('CREATE REVIEW ITEM ERROR: ', error.response);
      // const errMsg = 'Ошибка при попытке создать новость';
      // this.setState({
      //   toastType: 'alert',
      //   toastMessage: errMsg,
      //   openToast: true,
      //   open: false,
      //   submitting: false,
      // });
    }
  };
















  // function getComments(token, media_id, element) {
  //   const url = `https://api.instagram.com/v1/media/${media_id}/comments?access_token=${token}`;
  //
  //   const storage = sessionStorage.getItem(element);
  //
  //   if (storage) {
  //     renderData(JSON.parse(storage), element);
  //     return;
  //   }
  //
  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       if (data && data.data && data.data.length) {
  //         sessionStorage.setItem(element, JSON.stringify(data.data));
  //         renderData(data.data, element);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('GET COMMENTS ERROR:', error);
  //     });
  // }



  render() {
    const {
      handleSubmit,
      valid,
      dirty
    } = this.props;
    const { previewObj } = this.state;
    return (
      <StyledPaper>
        <StyledForm>
          <LeftCol>
            <Field
              display="block"
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
          </LeftCol>
          <RightCol>
            <FormRow className="hasicon">
              <Field
                name="link"
                label="Ссылка на отзыв в instagram"
                type="text"
                component={StyledTextField}
                fieldProps={{
                  inputProps: { ref: (c) => {this.link = c} },
                }}
              />
              <IconButton style={{flex: 'none'}} aria-label="Delete" onClick={this.getReviewsFromInstagram}>
                <Tooltip title="Загрузить по ссылке" enterDelay={500} placement="left">
                  <Icon>archive</Icon>
                </Tooltip>
              </IconButton>
            </FormRow>
            <Comments>
              <FieldArray name="comments" component={renderComments} />
            </Comments>
          </RightCol>
        </StyledForm>




        <Footer>
          <div style={{width: '152px'}}>
            <Field
              name="order"
              label="Порядковый номер"
              type="text"
              component={StyledTextField}
            />
          </div>
          <div style={{width: '100%', textAlign: 'right'}}>
            <Button size="small" variant="contained" onClick={handleSubmit(this.submitForm)} color="primary">
              Сохранить
            </Button>
          </div>
        </Footer>







      </StyledPaper>
    )
  }
}

export default compose(
  connect(
    null,
    { createReviewItem }
  ),
  reduxForm()
    // {
    // validate,
    // enableReinitialize: true,
  // })
)(Review);