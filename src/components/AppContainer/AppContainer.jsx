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
  width: 200px;
  flex: none;
  background: #cccccc;
  padding: 10px;
`;

const Content = styled.div`
  padding: 10px;
  width: 100%;
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
        <Sidebar>sidebar here</Sidebar>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default AppContainer;