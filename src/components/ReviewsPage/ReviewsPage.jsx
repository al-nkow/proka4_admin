import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import AddNewsDialog from './AddNewsDialog';
// import EditNewsDialog from './EditNewsDialog';
import Toast from '../Toast';
import Spinner from '../Spinner';
import ConfirmActionDialog from '../ConfirmActionDialog';
import { getReviewsList, deleteReviewItem } from '../../redux/actions/reviews'; // deleteReviewsItem
import AddReviewDialog from './AddReviewDialog';

import styled from 'styled-components';



import {
  ReviewBlock,
  PageHead,
  Comment,
  CommentsWrap,
  NewsWrap,
  ImgWrap,
  NewsBody,
  Title,
  Created,
  Actions,
  Error,
} from './parts';


import Review from './Review'






















const baseURL = process.env.NODE_ENV === 'production' ? 'http://37.140.198.199:3000' : 'http://localhost:3000';

class ReviewsPage extends PureComponent {
  state = {
    reviewToDelete: '',
    openToast: false,
    newsToEdit: null,
    error: false
  };

  componentDidMount() {
    if (this.props.reviews && this.props.reviews.length) return;
    this.props.getReviewsList().catch((err) => {
      this.setState({ error: true });
      console.log('GET REVIEWS ERROR: ', err);
    });
  }

  deleteReview = async () => {
    const { reviewToDelete } = this.state;
    if (!reviewToDelete) return;
    try {
      await this.props.deleteReviewItem(reviewToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Отзывы успешно удалёны',
        openToast: true,
        reviewToDelete: ''
      });
    } catch(error) {
      console.log('DELETE REVIEW ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении отзывов',
        openToast: true,
        reviewToDelete: ''
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
    this.setState({ reviewToDelete: '' });
  };

  selectReviewForDelete = (review) => {
    this.setState({ reviewToDelete: review });
  };

  getMaxOrder = (reviews) => {
    if (!reviews || reviews && !reviews.length) return '';
    return reviews.reduce((result, item) => {
      return item.order && (item.order > result) ? item.order : result;
    }, 0);
  };

  // selectNewsForEdit = (news) => {
  //   this.setState({ newsToEdit: news });
  // };
  //
  // handleCloseEditDialog = () => {
  //   this.setState({ newsToEdit: null });
  // };

  render() {
    const { reviewToDelete, newsToEdit, openToast, toastMessage, toastType, error } = this.state;
    const { reviews, isLoading } = this.props;
    console.log('>>>>>>>>', reviews);

    const orderMax = this.getMaxOrder(reviews);




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
          message={`Вы действительно хотите удалить отзывы?`}
          open={!!reviewToDelete}
          onCloseHandler={this.handleConfirmActionDialogClose}
          action={this.deleteReview}
        />
        <PageHead>
          Инстаграм отзывы
        </PageHead>
        {/*<p>Новости отсортированы по дате добавления - если необходимо изменить порядок вывода новостей, просто измените дату</p>*/}
        {/*<AddNewsDialog />*/}
        {/*<EditNewsDialog open={!!newsToEdit} news={newsToEdit} handleClose={this.handleCloseEditDialog}/>*/}
        { error && <Error>Ошибка сервера. Не удалось получить список новостей.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}




        <AddReviewDialog orderMax={orderMax}/>



        {/*<Review form="mycustomformname" />*/}




        {
          reviews && reviews.length ? reviews.map(item => (
            <ReviewBlock key={item._id}>
              <div style={{textAlign: 'right', margin: '0 -10px 0 -10px'}}>
                <span>{item.order}</span>
                <IconButton
                  style={{color: '#9e9e9e'}}
                  aria-label="Delete"
                  color="primary"
                  onClick={() => {}}
                >
                  <Tooltip title="Редактировать отзывы" enterDelay={500} placement="top" >
                    <Icon>edit</Icon>
                  </Tooltip>
                </IconButton>
                <IconButton
                  style={{color: '#9e9e9e'}}
                  aria-label="Delete"
                  color="primary"
                  onClick={() => this.selectReviewForDelete(item)}
                >
                  <Tooltip title="Удалить отзывы" enterDelay={500} placement="top" >
                    <Icon>delete</Icon>
                  </Tooltip>
                </IconButton>
              </div>
              <a className="" href={item.link} target="_blank">
                <img src={baseURL + item.image} style={{width: '100%'}} alt=""/>
              </a>
              <CommentsWrap>
                {
                  item.comments && item.comments.length ? item.comments.map(comment => (
                    <Comment key={comment._id}>
                      <div><b>{comment.name}</b></div>
                      <div>{comment.comment}</div>
                    </Comment>
                  )) : 'Нет комментариев'
                }
              </CommentsWrap>
            </ReviewBlock>
          )) : ''
        }






        {/*<NewsWrap>*/}
          {/*{*/}
            {/*news && news.length ? news.map((item) => (*/}
              {/*<NewsBlock key={item._id}>*/}
                {/*<ImgWrap>*/}
                  {/*<img src={baseURL + item.image} alt=""/>*/}
                {/*</ImgWrap>*/}
                {/*<NewsBody>*/}
                  {/*<Title>{item.title}</Title>*/}
                  {/*<Created>{moment(item.date).format('DD.MM.YYYY HH:mm')}</Created>*/}
                  {/*<Actions>*/}
                    {/*<IconButton aria-label="Edit" onClick={() => { this.selectNewsForEdit(item) } }>*/}
                      {/*<Tooltip title="Редактировать новость" enterDelay={500} placement="top">*/}
                        {/*<Icon>edit</Icon>*/}
                      {/*</Tooltip>*/}
                    {/*</IconButton>*/}
                    {/*<IconButton aria-label="Delete" onClick={() => { this.selectNewsForDelete(item) } }>*/}
                      {/*<Tooltip title="Удалить новость" enterDelay={500} placement="top" >*/}
                        {/*<Icon>delete</Icon>*/}
                      {/*</Tooltip>*/}
                    {/*</IconButton>*/}
                  {/*</Actions>*/}
                {/*</NewsBody>*/}
              {/*</NewsBlock>*/}
            {/*)) : ''*/}
          {/*}*/}
        {/*</NewsWrap>*/}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  states: state,
  reviews: idx(state, _ => _.reviews.list),
  isLoading: idx(state, _ => _.reviews.isLoading),
});

export default connect(mapStateToProps, { getReviewsList, deleteReviewItem })(ReviewsPage);
