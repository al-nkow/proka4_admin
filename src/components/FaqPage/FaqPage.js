import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { getQuestionsList } from '../../redux/actions/faq';
import Toast from '../Toast';
import ConfirmActionDialog from '../ConfirmActionDialog';
import AddQuestionDialog from './AddQuestionDialog';

const TableWrap = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
`;

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin-bottom: 10px;
  max-width: 600px;
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
  margin-bottom: 10px;
`;


class FaqPage extends PureComponent {
  state = {
    userToDelete: '',
    openToast: false
  };

  componentDidMount() {
    if (this.props.questionsList && this.props.questionsList.length) return;
    this.props.getQuestionsList().catch((err) => {
      this.setState({ error: true });
      console.log('GET QUESTIONS LIST ERROR: ', err);
    });
  }

  // handleConfirmActionDialogClose = () => {
  //   this.setState({ userToDelete: '' });
  // };
  //
  // handleCloseToast = () => {
  //   this.setState({
  //     openToast: false,
  //     toastType: '',
  //     toastMessage: ''
  //   });
  // };
  //
  // deleteUserButtonClick = (n) => {
  //   this.setState({ userToDelete: n });
  // };

  // deleteUser = async () => {
  //   try {
  //     await this.props.removeUser(this.state.userToDelete._id);
  //     this.setState({
  //       toastType: 'success',
  //       toastMessage: 'Пользователь успешно удалён',
  //       openToast: true,
  //       userToDelete: ''
  //     });
  //   } catch(error) {
  //     console.log('DELETE USER ERROR: ', error);
  //     this.setState({
  //       toastType: 'alert',
  //       toastMessage: 'Ошибка при удалении пользователя',
  //       openToast: true,
  //       userToDelete: ''
  //     });
  //   }
  // };

  render() {
    const { userToDelete, openToast, toastMessage, toastType } = this.state;
    const { questionsList, ownState } = this.props;

    console.log('>>>>>>>>', questionsList);


    return (
      <Fragment>
        {/*<Toast*/}
          {/*type={toastType}*/}
          {/*title={toastMessage}*/}
          {/*open={openToast}*/}
          {/*handleClose={this.handleCloseToast}*/}
          {/*duration={2000}*/}
        {/*/>*/}
        {/*<ConfirmActionDialog*/}
          {/*message={`Вы действительно хотите удалить пользователя ${userToDelete.email}?`}*/}
          {/*open={!!userToDelete}*/}
          {/*onCloseHandler={this.handleConfirmActionDialogClose}*/}
          {/*action={this.deleteUser}*/}
        {/*/>*/}
        <PageHead>
          Часто задаваемые вопросы
        </PageHead>
        <AddQuestionDialog />

        <QuestionsWrap>
          {
            questionsList ? questionsList.map((item, ind) => (
              <StyledPaper key={ind}>
                <Question>{item.question}</Question>
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
  ownState: state,
  questionsList: state.faq && state.faq.list ? state.faq.list : null
});

export default connect(mapStateToProps, { getQuestionsList })(FaqPage);
