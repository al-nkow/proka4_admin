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
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    width: 55px;
    padding-top: 20px;
  }
`;

const Content = styled.div`
  padding: 40px;
  width: 100%;
  background: #F6F6F6;
  overflow: auto;
  @media screen and (max-width: 400px) {
    padding: 15px;
  }
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
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const Exit = styled.div`
  padding: 20px 40px;
  cursor: pointer;
  color: #ffffff;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;
  &:hover {
    background: rgba(255,255,255,0.2);
  }
  @media screen and (max-width: 400px) {
    padding: 20px 5px;
    font-size: 15px;
  }
`;

const Buttons = styled.div`
  min-height: 0;
  height: 100%;
  overflow: auto;
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
          <Buttons>
            <MenuItem name="Аналитика" icon="dashboard" link="/" />
            <MenuItem name="Регистрация" icon="accessibility_new" link="/members" />
            <MenuItem name="Контент" icon="create" link="/content" />
            <MenuItem name="Пользователи" icon="people" link="/users" />
            <MenuItem name="Новости" icon="access_time" link="/news" />
            <MenuItem name="Отзывы" icon="rate_review" link="/reviews" />
            <MenuItem name="Вопросы" icon="face" link="/faq" />
            <MenuItem name="Партнёры" icon="business_center" link="/partners" />
            <MenuItem name="Документы" icon="picture_as_pdf" link="/documents" />
            <MenuItem name="Instagram" icon="party_mode" link="/instagram" />
          </Buttons>
          <Exit onClick={this.exit}>
            Выход
          </Exit>
        </Sidebar>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default connect(null, { logout })(AppContainer);