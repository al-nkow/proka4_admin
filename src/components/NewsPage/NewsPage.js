import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddNewsDialog from './AddNewsDialog';
import idx from 'idx';
import { getNewsList } from '../../redux/actions/news';


import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';




const baseURL = process.env.NODE_ENV === 'production' ? 'http://37.140.198.199:3000' : 'http://localhost:3000';

const NewsBlock = styled(Paper)`
  margin-bottom: 10px;
  max-width: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

const NewsWrap = styled.div`
  padding-top: 40px;
`;

const ImgWrap = styled.div`
  width: 200px;
  img {
    display: block;
    width: 100%;
  }
`;

const NewsBody = styled.div`
  padding: 20px 10px 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-right: 15px;
`;

const Created = styled.div`
  font-size: 14px;
  color: #777777;
`;

const Actions = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

class NewsPage extends PureComponent {

  componentDidMount() {
    // TODO: add ERROR HANDLER and PRELOADER
    if (idx(this, _ => _.props.news.list)) return;
    this.props.getNewsList();
  }

  render() {
    const { news } = this.props;
    if (news && news.length) console.log('>>>>', news);

    return (
      <Fragment>
        <PageHead>
          Новости
        </PageHead>
        <p>Новости отсортированы по дате добавления - если необходимо изменить порядок вывода новостей, просто измените дату</p>
        <AddNewsDialog />
        <NewsWrap>
          {
            news && news.length && news.map((item, i) => (
              <NewsBlock key={item._id}>
                <ImgWrap>
                  <img src={baseURL + item.image} alt=""/>
                </ImgWrap>
                <NewsBody>
                  <Title>{item.title}</Title>
                  <Created>{item.date}</Created>
                  <Actions>
                    <IconButton aria-label="Delete" onClick={() => {}}>
                      <Tooltip title="Редактировать новость" enterDelay={500} placement="top">
                        <Icon>edit</Icon>
                      </Tooltip>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => {}}>
                      <Tooltip title="Удалить новость" enterDelay={500} placement="top">
                        <Icon>delete</Icon>
                      </Tooltip>
                    </IconButton>
                  </Actions>
                </NewsBody>
              </NewsBlock>
            ))
          }
        </NewsWrap>











      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  states: state,
  news: idx(state, _ => _.news.list),
});

export default connect(mapStateToProps, { getNewsList })(NewsPage);
