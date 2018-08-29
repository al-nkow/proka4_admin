import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddNewsDialog from './AddNewsDialog';
import idx from 'idx';
import { getNewsList, deleteNewsItem } from '../../redux/actions/news';

import Toast from '../Toast';
import ConfirmActionDialog from '../ConfirmActionDialog';


import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';



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
  state = {
    newsToDelete: '',
    openToast: false
  };

  componentDidMount() {
    // TODO: add ERROR HANDLER and PRELOADER
    if (idx(this, _ => _.props.news.list)) return;
    this.props.getNewsList();
  }

  deleteNews = async () => {
    const { newsToDelete } = this.state;
    if (!newsToDelete) return;
    try {
      await this.props.deleteNewsItem(newsToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Новость успешно удалёна',
        openToast: true,
        newsToDelete: ''
      });
    } catch(error) {
      console.log('DELETE NEWS ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении новости',
        openToast: true,
        newsToDelete: ''
      });
    }
  };

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  handleConfirmActionDialogClose = () => {
    this.setState({ newsToDelete: '' });
  };

  selectNewsForDelete = (news) => {
    this.setState({ newsToDelete: news });
  };











  render() {
    const { newsToDelete, openToast, toastMessage, toastType } = this.state;
    const { news } = this.props;
    if (news && news.length) console.log('>>>>', news);

    return (
      <Fragment>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <ConfirmActionDialog
          message={`Вы действительно хотите удалить новость "${newsToDelete ? newsToDelete.title : ''}"?`}
          open={!!newsToDelete}
          onCloseHandler={this.handleConfirmActionDialogClose}
          action={this.deleteNews}
        />
        <PageHead>
          Новости
        </PageHead>
        <p>Новости отсортированы по дате добавления - если необходимо изменить порядок вывода новостей, просто измените дату</p>
        <AddNewsDialog />
        <NewsWrap>
          {
            news && news.length ? news.map((item) => (
              <NewsBlock key={item._id}>
                <ImgWrap>
                  <img src={baseURL + item.image} alt=""/>
                </ImgWrap>
                <NewsBody>
                  <Title>{item.title}</Title>
                  <Created>{moment(item.date).format('DD.MM.YYYY HH:mm')}</Created>
                  <Actions>
                    <IconButton aria-label="Edit" onClick={() => {}}>
                      <Tooltip title="Редактировать новость" enterDelay={500} placement="top">
                        <Icon>edit</Icon>
                      </Tooltip>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => { this.selectNewsForDelete(item) } }>
                      <Tooltip title="Удалить новость" enterDelay={500} placement="top" >
                        <Icon>delete</Icon>
                      </Tooltip>
                    </IconButton>
                  </Actions>
                </NewsBody>
              </NewsBlock>
            )) : ''
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

export default connect(mapStateToProps, { getNewsList, deleteNewsItem })(NewsPage);
