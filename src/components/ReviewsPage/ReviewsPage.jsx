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
import EditReviewDialog from './EditReviewDialog';

import styled from 'styled-components';



import {
  ReviewBlock,
  ReviewBlockControls,
  PageHead,
  Comment,
  CommentsWrap,
  Controls,
  Order,
  PreviewImage,
  Error,
} from './parts';
























const baseURL = process.env.NODE_ENV === 'production' ? 'http://185.20.224.109:3000' : 'http://localhost:3000';

class ReviewsPage extends PureComponent {
  state = {
    reviewToDelete: '',
    openToast: false,
    reviewToEdit: null,
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

  selectReviewForEdit = (news) => {
    this.setState({ reviewToEdit: news });
  };

  getMaxOrder = (reviews) => {
    if (!reviews || reviews && !reviews.length) return '';
    return reviews.reduce((result, item) => {
      return item.order && (item.order > result) ? item.order : result;
    }, 0);
  };

  handleCloseEditDialog = () => {
    this.setState({ reviewToEdit: null });
  };

  render() {
    const { reviewToDelete, reviewToEdit, openToast, toastMessage, toastType, error } = this.state;
    const { reviews, isLoading } = this.props;
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
        <p>Отзывы отсортированы по номеру - если необходимо изменить порядок вывода, просто измените порядковый номер</p>
        <Controls>
          <AddReviewDialog orderMax={orderMax}/>
          <EditReviewDialog open={!!reviewToEdit} review={reviewToEdit} handleClose={this.handleCloseEditDialog}/>
        </Controls>
        { error && <Error>Ошибка сервера. Не удалось получить список отзывов.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}
        {
          !isLoading && reviews && reviews.length ? reviews.map(item => (
            <ReviewBlock key={item._id}>
              <ReviewBlockControls>

                <Order className={item.order ? '' : 'noorder'}>{item.order}</Order>

                <IconButton
                  style={{color: '#9e9e9e'}}
                  aria-label="Delete"
                  color="primary"
                  onClick={() => this.selectReviewForEdit(item)}
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
              </ReviewBlockControls>
              <PreviewImage className="" href={item.link} target="_blank">
                <img src={baseURL + item.image} style={{width: '100%'}} alt=""/>
              </PreviewImage>
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
