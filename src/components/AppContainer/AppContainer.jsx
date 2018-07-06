import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  z-index: 1;
  width: 260px;
  flex: none;
  background: #2e3340;
  background: -moz-linear-gradient(top, #2e3340 0%, #323441 100%);
  background: -webkit-linear-gradient(top, #2e3340 0%,#323441 100%);
  background: linear-gradient(to bottom, #2e3340 0%,#323441 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2e3340', endColorstr='#323441',GradientType=0 );
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
`;

const MenuItem = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  padding: 20px 30px;
  text-transform: uppercase;
`;

const Content = styled.div`
  padding: 40px;
  width: 100%;
  background: #F6F6F6;
`;

class AppContainer extends PureComponent {
  // componentDidMount() {
  //   const {
  //     loadCurrentUserData,
  //     isUserDataLoading,
  //   } = this.props;
  //   if (!isUserDataLoading) {
  //     loadCurrentUserData();
  //   }
  // }

  render() {
    return (
      <Wrap>
        <Sidebar>
          <MenuItem>Логин</MenuItem>
          <MenuItem>Пользователи</MenuItem>
        </Sidebar>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default AppContainer;