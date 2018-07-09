import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
import { getUsersList, removeUser } from '../../redux/actions/users';
// import Toast from '../Toast';
// import ConfirmActionDialog from '../ConfirmActionDialog';
// import AddUserDialog from './AddUserDialog';
import validate from './validate';

const TableWrap = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
`;

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

const StyledTable = styled(Table)`
  width: 100%;
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

class ContentPage extends PureComponent {

  state = {
    userToDelete: '',
    openToast: false
  };

  componentDidMount() {
    this.props.getUsersList()
  }

  submitForm = (values) => {
    console.log('>>>>>>', values);
  };

  render() {
    const { userToDelete, openToast, toastMessage, toastType } = this.state;
    const { usersList, handleSubmit } = this.props;
    return (
      <Fragment>
        <PageHead>
          Контент
        </PageHead>







        <form onSubmit={handleSubmit(this.submitForm)}>
          <StyledPaper>
            <Title>Главный блок</Title>
          </StyledPaper>
          <StyledPaper>
            <Title>О проекте</Title>
          </StyledPaper>
        </form>












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
        {/*<PageHead>*/}
          {/*Users*/}
        {/*</PageHead>*/}

        {/*<AddUserDialog />*/}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  usersList: state.users && state.users.list ? state.users.list : null
});

export default compose(
  connect(
    mapStateToProps,
    { getUsersList, removeUser }
  ),
  reduxForm({
    form: 'contentForm',
    validate,
    enableReinitialize: true,
  })
)(ContentPage);
