import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { getMembersList, removeMember } from '../../redux/actions/members';
import ConfirmActionDialog from '../ConfirmActionDialog';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toast from '../Toast';

import styled from 'styled-components';

const PageHead = styled.div`
  height: 40px;
  font-size: 22px;
  margin-bottom: 30px;
`;

const TableWrap = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
`;

const StyledTable = styled(Table)`
  width: 100%;
`;

class MembersPage extends PureComponent {

  state = {
    memberToDelete: '',
    openToast: false,
  };

  componentDidMount() {
    // TODO: add error handler (loading FAIL)
    if (this.props.membersList && this.props.membersList.length) return;
    this.props.getMembersList();
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  deleteMemberButtonClick = (member) => {
    this.setState({ memberToDelete: member });
  }

  handleConfirmActionDialogClose = () => {
    this.setState({ memberToDelete: '' });
  };

  deleteMember = async () => {
    try {
      await this.props.removeMember(this.state.memberToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Регистрация успешно удалёна',
        openToast: true,
        memberToDelete: ''
      });
    } catch(error) {
      console.log('DELETE MEMBER ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении регстрации',
        openToast: true,
        memberToDelete: ''
      });
    }
  };

  render() {
    const { membersList } = this.props;
    const { memberToDelete, openToast, toastMessage, toastType } = this.state;

    const name = `${memberToDelete.firstName} ${memberToDelete.lastName}`;

    return (
      <Fragment>
        <PageHead>
          Регистрация
        </PageHead>

        <ConfirmActionDialog
          message={`Вы действительно хотите удалить регистрацию ${name}?`}
          open={!!memberToDelete}
          onCloseHandler={this.handleConfirmActionDialogClose}
          action={this.deleteMember}
        />

        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />

        <TableWrap>
          {
            membersList ? (
              <Paper style={{overflow: 'auto'}}>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>Имя</TableCell>
                      <TableCell numeric>Email</TableCell>
                      <TableCell numeric>Телефон</TableCell>
                      <TableCell numeric></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      membersList.map((member, i) => (
                        <TableRow key={member._id}>
                          <TableCell component="th" scope="row">
                            {`${member.firstName} ${member.lastName}`}
                          </TableCell>
                          <TableCell numeric><a href={'mailto:' + member.email}>{member.email}</a></TableCell>
                          <TableCell numeric>{member.phone}</TableCell>
                          <TableCell numeric>
                            <IconButton
                              aria-label="Delete"
                              onClick={() => this.deleteMemberButtonClick(member)}
                            >
                              <Tooltip title="Удалить регистрацию" enterDelay={500} placement="left">
                                <Icon>delete</Icon>
                              </Tooltip>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </StyledTable>
              </Paper>
            ) : ''
          }
        </TableWrap>

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  membersList: state.members && state.members.list ? state.members.list : null
});

export default connect(mapStateToProps, { getMembersList, removeMember })(MembersPage);

