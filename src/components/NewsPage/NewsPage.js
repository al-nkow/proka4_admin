import React, { PureComponent, Fragment } from 'react';
// import { connect } from 'react-redux';
import styled from 'styled-components';

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

class NewsPage extends PureComponent {

  render() {
    return (
      <Fragment>
        <PageHead>
          Новости
        </PageHead>
      </Fragment>
    )
  }
}

export default NewsPage;
