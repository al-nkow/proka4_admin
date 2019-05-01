import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import idx from 'idx';
import {error} from '../../utils/colors';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { getQuestionsList, removeQuestion } from '../../redux/actions/faq';
import ConfirmActionDialog from '../ConfirmActionDialog';
import AddQuestionDialog from './AddQuestionDialog';
import EditQuestionDialog from './EditQuestionDialog';
import Spinner from '../Spinner';
import Toast from '../Toast';

export const Error = styled.div`
  padding: 40px 0;
  color: ${error.main};
`;

const PageHead = styled.div`
  height: 40px;
  font-size: 22px;
  margin-bottom: 30px;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin-bottom: 10px;
  max-width: 700px;
`;

const QuestionsWrap = styled.div`
  padding-top: 40px;
`;

const Answer = styled.div`
  font-size: 14px;
  color: #888888;
  font-weight: 300;
`;

const Question = styled.div`
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex: none;
  margin-top: -10px;
  margin-right: -10px;
`;

class FaqPage extends PureComponent {
  state = {
    questionToDelete: '',
    setQuestionForEdit: '',
    openToast: false,
    error: false
  };

  componentDidMount() {
    if (this.props.questionsList && this.props.questionsList.length) return;
    this.props.getQuestionsList().catch(() => this.setState({ error: true }));
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  setQuestionToDelete = q => this.setState({ questionToDelete: q });

  setQuestionForEdit = q => this.setState({ questionForEdit: q });

  deleteQuestion = async () => {
    try {
      await this.props.removeQuestion(this.state.questionToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Вопрос успешно удалён',
        openToast: true,
        questionToDelete: ''
      });
    } catch(error) {
      console.log('DELETE QUESTION ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении вопроса',
        openToast: true,
        questionToDelete: ''
      });
    }
  };

  render() {
    const { questionToDelete, questionForEdit, openToast, toastMessage, toastType, error } = this.state;
    const { questionsList, isLoading } = this.props;

    return (
      <Fragment>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <ConfirmActionDialog
          message={`Вы действительно хотите удалить вопрос "${questionToDelete && questionToDelete.question}"?`}
          open={!!questionToDelete}
          onCloseHandler={() => this.setQuestionToDelete('')}
          action={this.deleteQuestion}
        />
        <PageHead>
          Часто задаваемые вопросы
        </PageHead>
        <AddQuestionDialog />
        <EditQuestionDialog open={!!questionForEdit} question={questionForEdit} handleClose={() => this.setQuestionForEdit('')}/>

        { error && <Error>Ошибка сервера. Не удалось получить список вопросов.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}

        <QuestionsWrap>
          {
            !isLoading && questionsList && questionsList.length ? questionsList.map((item, ind) => (
              <StyledPaper key={ind}>
                <Head>
                  <Question>{item.question}</Question>
                  <Actions>
                    <IconButton aria-label="Edit" onClick={() => this.setQuestionForEdit(item) }>
                      <Tooltip title="Редактировать вопрос" enterDelay={500} placement="top">
                        <Icon>edit</Icon>
                      </Tooltip>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.setQuestionToDelete(item) }>
                      <Tooltip title="Удалить вопрос" enterDelay={500} placement="top" >
                        <Icon>delete</Icon>
                      </Tooltip>
                    </IconButton>
                  </Actions>
                </Head>
                <Answer>{item.answer}</Answer>
              </StyledPaper>
              )
            ) : ''
          }
        </QuestionsWrap>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: idx(state, _ => _.faq.isLoading),
  questionsList: state.faq && state.faq.list ? state.faq.list : null
});

export default connect(mapStateToProps, { getQuestionsList, removeQuestion })(FaqPage);
