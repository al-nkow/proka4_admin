import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

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

const Content = styled.div`
  padding: 40px;
  width: 100%;
  background: #F6F6F6;
`;

const SidebarHead = styled.div`
  padding: 20px;
  span {
    display: block;
    padding: 10px;
    border-bottom: 1px solid #cccccc;
    color: #ffffff;
    font-size: 14px;
    font-weight: 300;
  }
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
          <SidebarHead><span>Административная панель</span></SidebarHead>
          <MenuItem name="Контент" icon="create" />
          <MenuItem name="Пользователи"  icon="people" />
        </Sidebar>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default AppContainer;