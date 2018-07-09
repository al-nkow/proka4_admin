import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

const Wrap = styled.div`
  padding: 2px 15px;
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 200;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-transform: none;
    transition: background-color 0.3s linear;
    .icon {
      font-size: 25px;
      margin-right: 20px;
    }
    &.active {
      background-color: #bb6258;
    }
  }
`;

const MenuItem = (props) => {
  const { link, name, icon, location: { pathname } } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Wrap>
        <Link to={link}>
          <StyledButton className={link === pathname ? 'active' : ''}>
            <Icon className="icon">{icon}</Icon>
            <div>{name}</div>
          </StyledButton>
        </Link>
      </Wrap>
    </MuiThemeProvider>
  )
};

export default withRouter(MenuItem);