import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { getUsersList, removeUser } from '../../redux/actions/users';
import Toast from '../Toast';
import ConfirmActionDialog from '../ConfirmActionDialog';
import AddUserDialog from './AddUserDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

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

class UsersPage extends PureComponent {
  state = {
    userToDelete: '',
    userChangePassword: '',
    openToast: false,
    currentUserId: localStorage.getItem('id'),
  };

  componentDidMount() {
    // TODO: add error handler (loading FAIL)
    if (this.props.usersList && this.props.usersList.length) return;
    this.props.getUsersList();
  }

  handleConfirmActionDialogClose = () => {
    this.setState({ userToDelete: '' });
  };

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  deleteUserButtonClick = (n) => {
    this.setState({ userToDelete: n });
  };

  setUserChangePassword = (n) => {
    this.setState({ userChangePassword: n });
  }

  deleteUser = async () => {
    try {
      await this.props.removeUser(this.state.userToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Пользователь успешно удалён',
        openToast: true,
        userToDelete: ''
      });
    } catch(error) {
      console.log('DELETE USER ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении пользователя',
        openToast: true,
        userToDelete: ''
      });
    }
  };

  render() {
    const { userToDelete, openToast, toastMessage, toastType, currentUserId, userChangePassword } = this.state;
    const { usersList } = this.props;
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
          message={`Вы действительно хотите удалить пользователя ${userToDelete.email}?`}
          open={!!userToDelete}
          onCloseHandler={this.handleConfirmActionDialogClose}
          action={this.deleteUser}
        />
        <PageHead>
          Пользователи
        </PageHead>
        <TableWrap>
          {
            usersList ? (
              <Paper>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Имя</TableCell>
                      <TableCell numeric>Email</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersList.map((n, i) => {
                      return (
                        <TableRow key={n._id}>
                          <TableCell numeric>{i + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {n.name || 'no name'}
                          </TableCell>
                          <TableCell numeric>{n.email}</TableCell>
                          <TableCell numeric>
                            {
                              n._id === currentUserId ? (
                                <IconButton aria-label="Delete" onClick={() => this.setUserChangePassword(n)}>
                                  <Tooltip title="Изменить пароль" enterDelay={500} placement="left">
                                    <Icon>update</Icon>
                                  </Tooltip>
                                </IconButton>
                              ) : (
                                <IconButton aria-label="Delete" onClick={() => this.deleteUserButtonClick(n)}>
                                  <Tooltip title="Удалить пользователя" enterDelay={500} placement="left">
                                    <Icon>delete</Icon>
                                  </Tooltip>
                                </IconButton>
                              )
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </StyledTable>
              </Paper>
            ) : (<div>Нет данных</div>)
          }
        </TableWrap>
        <AddUserDialog />
        <ChangePasswordDialog
          open={!!userChangePassword}
          user={userChangePassword}
          handleClose={() => this.setUserChangePassword('')}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  usersList: state.users && state.users.list ? state.users.list : null
});

export default connect(mapStateToProps, { getUsersList, removeUser })(UsersPage);
