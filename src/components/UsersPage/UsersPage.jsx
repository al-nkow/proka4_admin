import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsersList } from '../../redux/actions/users';

const TableWrap = styled.div`
  max-width: 600px;
`;

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

class UsersPage extends PureComponent {

  componentDidMount() {
    this.props.getUsersList()
  }

  render() {
    const { usersList } = this.props;
    return (
      <Fragment>
        <PageHead>
          Users
        </PageHead>
        <TableWrap>
          {
            usersList ? (
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>ID</TableCell>
                      <TableCell numeric>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersList.map((n, i) => {
                      return (
                        <TableRow key={n._id}>
                          <TableCell numeric>{i + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {n._id}
                          </TableCell>
                          <TableCell numeric>{n.email}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            ) : (<div>Нет данных</div>)
          }
        </TableWrap>
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({
  usersList: state.users && state.users.list ? state.users.list : null
});

export default connect(mapStateToProps, { getUsersList })(UsersPage);
