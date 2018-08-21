import React, { PureComponent, Fragment } from 'react';
// import { connect } from 'react-redux';
import styled from 'styled-components';
import AddNewsDialog from './AddNewsDialog';

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
        <p>Новости отсортированы по дате добавления - если необходимо изменить порядок вывода новостей, просто измените дату</p>
        <AddNewsDialog />
      </Fragment>
    )
  }
}

export default NewsPage;
