import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddNewsDialog from './AddNewsDialog';
import EditNewsDialog from './EditNewsDialog';
import Toast from '../Toast';
import Spinner from '../Spinner';
import ConfirmActionDialog from '../ConfirmActionDialog';
import { getNewsList, deleteNewsItem } from '../../redux/actions/news';
import {
  NewsBlock,
  PageHead,
  NewsWrap,
  ImgWrap,
  NewsBody,
  Title,
  Created,
  Actions,
  Error,
} from './parts';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

class NewsPage extends PureComponent {
  state = {
    newsToDelete: '',
    openToast: false,
    newsToEdit: null,
    error: false
  };

  componentDidMount() {
    if (this.props.news && this.props.news.length) return;
    this.props.getNewsList().catch((err) => {
      this.setState({ error: true });
      console.log('GET NEWS ERROR: ', err);
    });
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

  selectNewsForEdit = (news) => {
    this.setState({ newsToEdit: news });
  };

  handleCloseEditDialog = () => {
    this.setState({ newsToEdit: null });
  };

  render() {
    const { newsToDelete, newsToEdit, openToast, toastMessage, toastType, error } = this.state;
    const { news, isLoading } = this.props;
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
        <EditNewsDialog open={!!newsToEdit} news={newsToEdit} handleClose={this.handleCloseEditDialog}/>
        { error && <Error>Ошибка сервера. Не удалось получить список новостей.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}
        <NewsWrap>
          {
            !isLoading && news && news.length ? news.map((item) => (
              <NewsBlock key={item._id}>
                <ImgWrap>
                  <img src={baseURL + item.image} alt=""/>
                </ImgWrap>
                <NewsBody>
                  <Title>{item.title}</Title>
                  <Created>{moment(item.date).format('DD.MM.YYYY HH:mm')}</Created>
                  <Actions>
                    <IconButton aria-label="Edit" onClick={() => { this.selectNewsForEdit(item) } }>
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
  isLoading: idx(state, _ => _.news.isLoading),
});

export default connect(mapStateToProps, { getNewsList, deleteNewsItem })(NewsPage);
