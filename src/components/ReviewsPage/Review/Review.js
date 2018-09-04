import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper/index';
import ImageUploader from '../../ImageUploader'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, reset } from 'redux-form';
import StyledTextField from '../../StyledTextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
const Comments = styled.div`
  border: 1px solid red;
  padding: 5px;
  max-height: 300px;
  overflow: auto;
`;
const FieldWrap = styled.div`
  margin-bottom: 20px;
`;
export const FormRow = styled.div`
  margin-bottom: 20px;
  &.hasicon {
    display: flex;
    flex-direction: row;
  }
`;

const renderComments = ({ fields, meta: { error } }) => (
  <div>
    {fields.map((point, index) => (
      <FormRow className="hasicon" key={index} style={{border: '1px solid green', marginBottom: '10px'}}>
        <Field
          name={`${point}.firstName`}
          label={`Пункт ${index + 1}`}
          type="text"
          fieldProps={{
            multiline: true,
            inputProps: { maxLength: 200 },
          }}
          component={StyledTextField}
        />
        <IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
          <Icon>delete</Icon>
        </IconButton>
      </FormRow>
    ))}
    <Button size="small" variant="contained" onClick={() => fields.push()} color="primary">
      Добавить
    </Button>
    {error && <div className="error">{error}</div>}
  </div>
);



class Review extends Component {
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
            <FieldWrap>
              <Field
                name="myname"
                label="Ссылка на отзыв в instagram"
                type="text"
                component={StyledTextField}
              />
            </FieldWrap>
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