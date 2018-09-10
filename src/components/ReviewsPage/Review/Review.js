import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper/index';
import ImageUploader from '../../ImageUploader'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, reset, formValueSelector } from 'redux-form';
import StyledTextField from '../../StyledTextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

const MAX_UPLOADED_FILE_SIZE = 1024 * 1024 * 2;


const revirews = [{
  created_time: '123456789',
  from: { username: 'Some_user_name1' },
  id: '123456ggg4567891',
  text: 'Some text here some text here some text here some text here'
},{
  created_time: '123456789',
  from: { username: 'Some_user_name2' },
  id: '123456ggg4567892',
  text: 'Some text here some text here some text here some text here'
}];


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
                inputProps: { maxLength: 1000 },
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


  // Get media_id: https://api.instagram.com/oembed/?url=__paste_url_here__

  getReviewsFromInstagram = () => {
    // console.log('>>>>>>>>', this.link.value);
    // axios.get('/user', {
    //   params: data,
    // }).then((res) => {console.log('>>>>>>', res);}).catch((err) => {console.log('>>>>>>', err);})


    // Здесь можно получить первый комментарий (автора поста) и ссылку на миниатюру
    fetch(`https://api.instagram.com/oembed/?url=${this.link.value}`)
      .then(res => res.json())
      .then((res) => {console.log('>>>>>>', res);})
      .catch((err) => {console.log('ERROR >>>>>>', err);})

    // fetch(`https://api.instagram.com/v1/media/${media_id}/comments?access_token=${token}`)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     if (data && data.data && data.data.length) {
    //       sessionStorage.setItem(element, JSON.stringify(data.data));
    //       renderData(data.data, element);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('GET COMMENTS ERROR:', error);
    //   });


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
    return (
      <StyledPaper>
        <StyledForm>
          <LeftCol>
            <Field
              display="block"
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
      </StyledPaper>
    )
  }
}

export default compose(
  // connect(
  //   mapStateToProps,
  //   { saveSiteContent, getSiteContent }
  // ),
  reduxForm()
    // {
    // validate,
    // enableReinitialize: true,
  // })
)(Review);