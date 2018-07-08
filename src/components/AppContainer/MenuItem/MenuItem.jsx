import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
    .icon {
      font-size: 25px;
      margin-right: 20px;
    }
  }
`;

const MenuItem = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Wrap>
        <StyledButton>
          <Icon className="icon">{props.icon}</Icon>
          <div>{props.name}</div>
        </StyledButton>
      </Wrap>
    </MuiThemeProvider>
  )
};

export default MenuItem;