import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import history from "../../history";
import {logout} from '../../redux/actions/users';
import {connect} from "react-redux";

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
  position: relative;
`;

const Content = styled.div`
  padding: 40px;
  width: 100%;
  background: #F6F6F6;
  overflow: auto;
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

const Exit = styled.div`
  padding: 20px 40px;
  cursor: pointer;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  &:hover {
    background: rgba(255,255,255,0.2);
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

  exit = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    this.props.logout({ token: refreshToken });
    localStorage.clear();
    history.push('/login');
  };

  render() {
    return (
      <Wrap>
        <Sidebar>
          <SidebarHead><span>Административная панель</span></SidebarHead>
          <MenuItem name="Аналитика" icon="dashboard" link="/" />
          <MenuItem name="Контент" icon="create" link="/content" />
          <MenuItem name="Пользователи" icon="people" link="/users" />
          <MenuItem name="Новости" icon="access_time" link="/news" />
          <MenuItem name="Отзывы" icon="rate_review" link="/reviews" />
          <MenuItem name="Вопросы" icon="face" link="/faq" />

          <Exit onClick={this.exit}>Выход</Exit>
        </Sidebar>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default connect(null, { logout })(AppContainer);