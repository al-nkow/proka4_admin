import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { saveSiteContent, getSiteContent } from '../../redux/actions/content';
import Toast from '../Toast';
import validate from './validate';
import StyledTextField from '../StyledTextField';
import { error } from '../../utils/colors';

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  max-width: 600px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const Error = styled.div`
  padding: 10px;
  color: ${error.main};
`;

class ContentPage extends PureComponent {
  state = {
    userToDelete: '',
    openToast: false
  };

  componentDidMount() {
    if (this.props.content && this.props.content._id) return;
    this.props.getSiteContent();
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  submitForm = async (values) => {
    try {
      await this.props.saveSiteContent(values);
      this.setState({
        toastType: 'success',
        toastMessage: 'Контент успешно обновлен',
        openToast: true
      });
      this.props.dispatch(reset('addUserForm'));
    } catch(error) {
      console.log('SAVE CONTENT ERROR: ', error.response);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка системы',
        openToast: true
      });
    }
  };

  render() {
    const { openToast, toastMessage, toastType } = this.state;
    const { handleSubmit, dirty, submitting, valid, loadingStatus } = this.props;
    return (
      <Fragment>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <PageHead>
          Контент
        </PageHead>
        {
          loadingStatus === 'FAIL' ? (<Error>Ошибка при загрузке контента</Error>) : (
            <form onSubmit={handleSubmit(this.submitForm)}>
              <StyledPaper>
                <Title>Главный блок</Title>
                <FormRow>
                  <Field
                    name="main.info"
                    label="Информация"
                    type="text"
                    fieldProps={{
                      multiline: true,
                      inputProps: { maxLength: 1000 },
                    }}
                    component={StyledTextField}
                  />
                </FormRow>
              </StyledPaper>
              <StyledPaper>
                <Title>О проекте</Title>
                <FormRow>
                  <Field
                    name="about.info"
                    label="Информация"
                    type="text"
                    fieldProps={{
                      multiline: true,
                      inputProps: { maxLength: 1000 },
                    }}
                    component={StyledTextField}
                  />
                </FormRow>
              </StyledPaper>
              <Button type="submit" variant="contained"  color="primary" disabled={!dirty || submitting || !valid}>
                Сохранить
              </Button>
            </form>
          )
        }
      </Fragment>
    )
  }
}

const checkContent = (state, name) => {
  return state.content && state.content.content && state.content.content[name];
};

const mapStateToProps = state => ({
  content: state.content ? state.content.content : {},
  loadingStatus: state.content ? state.content.loadingStatus : '',
  initialValues: {
    main: {
      info: checkContent(state, 'main') ? state.content.content.main.info : ''
    },
    about: {
      info: checkContent(state, 'about') ? state.content.content.about.info : ''
    }
  }
});

export default compose(
  connect(
    mapStateToProps,
    { saveSiteContent, getSiteContent }
  ),
  reduxForm({
    form: 'contentForm',
    validate,
    enableReinitialize: true,
  })
)(ContentPage);
