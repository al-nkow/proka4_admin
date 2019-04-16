import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { getMembersList } from '../../redux/actions/members';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

  componentDidMount() {
    // TODO: add error handler (loading FAIL)
    if (this.props.membersList && this.props.membersList.length) return;
    this.props.getMembersList();
  }

  render() {
    const { membersList } = this.props;
    console.log('>>>>>>', membersList);
    return (
      <Fragment>
        <PageHead>
          Регистрация
        </PageHead>


        <TableWrap>
          {
            membersList ? (
              <Paper>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>Имя</TableCell>
                      <TableCell numeric>Email</TableCell>
                      <TableCell numeric>Телефон</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      membersList.map((member, i) => (
                        <TableRow key={member._id}>
                          <TableCell component="th" scope="row">
                            {`${member.firstName} ${member.lastName}`}
                          </TableCell>
                          <TableCell numeric>{member.email}</TableCell>
                          <TableCell numeric>{member.phone}</TableCell>
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

export default connect(mapStateToProps, { getMembersList })(MembersPage);

