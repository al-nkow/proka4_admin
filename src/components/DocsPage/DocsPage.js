import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import idx from 'idx';
import {error} from '../../utils/colors';

import { getDocsList } from '../../redux/actions/documents';
import Spinner from '../Spinner';

import DocumentBlock from './DocumentBlock';

export const Error = styled.div`
  padding: 40px 0;
  color: ${error.main};
`;

const PageHead = styled.div`
  height: 40px;
    font-size: 22px;
    margin-bottom: 30px;
`;

class DocsPage extends PureComponent {
  state = {
    docToDelete: '',
    openToast: false,
    error: false
  };

  componentDidMount() {
    if (this.props.documentsList && this.props.documentsList.length) return;
    this.props.getDocsList().catch(() => this.setState({ error: true }));
  }

  render() {
    const { error } = this.state;
    const { documentsList, isLoading } = this.props;

    const docObj = {};
    if (documentsList) {
      documentsList.forEach(item => {
        docObj[item.name] = item;
      });
    }
    return (
      <Fragment>
        <PageHead>
          Документы
        </PageHead>
        { error && <Error>Ошибка сервера. Не удалось получить список вопросов.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}
        {
          (
            <Fragment>
              <DocumentBlock
                loading={isLoading}
                doc={docObj.policy}
                title="Политика конфиденциальности"
                name="policy"
              />
              <DocumentBlock
                loading={isLoading}
                doc={docObj.offer}
                title="Публичная оферта"
                name="offer"
              />
            </Fragment>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: idx(state, _ => _.documents.isLoading),
  documentsList: idx(state, _ => _.documents.list),
});

export default connect(mapStateToProps, { getDocsList })(DocsPage);
