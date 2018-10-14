import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import idx from 'idx';
import {error} from '../../utils/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { getPartnersList, deletePartnerItem } from '../../redux/actions/partners';
import ConfirmActionDialog from '../ConfirmActionDialog';
import AddPartnerDialog from './AddPartnerDialog';
import Spinner from '../Spinner';
import Toast from '../Toast';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

export const Error = styled.div`
  padding: 40px 0;
  color: ${error.main};
`;

const PageHead = styled.div`
  height: 40px;
    font-size: 22px;
    margin-bottom: 30px;
`;

const PartnersWrap = styled.div`
  padding-top: 40px;
`;

const PartnerBlock = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 20px 20px 0;
  .delete-button {
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;

const StyledLink = styled.a`
  display: block;
  height: 100%;
  img {
    display: block;
    max-height: 160px;
  }
`;

class PartnersPage extends PureComponent {
  state = {
    partnerToDelete: '',
    openToast: false,
    error: false
  };

  componentDidMount() {
    if (this.props.partnersList && this.props.partnersList.length) return;
    this.props.getPartnersList().catch(() => this.setState({ error: true }));
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  setPartnerToDelete = p => this.setState({ partnerToDelete: p });

  deletePartner = async () => {
    try {
      await this.props.deletePartnerItem(this.state.partnerToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Партнёр успешно удалён',
        openToast: true,
        partnerToDelete: ''
      });
    } catch(error) {
      console.log('DELETE PARTNER ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении партнёра',
        openToast: true,
        partnerToDelete: ''
      });
    }
  };

  render() {
    const { partnerToDelete, openToast, toastMessage, toastType, error } = this.state;
    const { partnersList, isLoading } = this.props;

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
          message={`Вы действительно хотите удалить партнёра?`}
          open={!!partnerToDelete}
          onCloseHandler={() => this.setPartnerToDelete('')}
          action={this.deletePartner}
        />
        <PageHead>
          Партнёры проекта
        </PageHead>
        <AddPartnerDialog />

        { error && <Error>Ошибка сервера. Не удалось получить список вопросов.</Error> }
        { isLoading && <Spinner height={150} maxWidth={700}/>}

        <PartnersWrap>
          {
            !isLoading && partnersList && partnersList.length ? partnersList.map((item, ind) => (
                <PartnerBlock key={ind}>
                  <StyledLink href={item.link} target="_blank">
                    <img src={baseURL + item.image} alt=""/>
                  </StyledLink>
                  <IconButton
                    className="delete-button"
                    aria-label="Delete"
                    color="primary"
                    onClick={() => this.setPartnerToDelete(item) }
                  >
                    <Tooltip title="Удалить партнёра" enterDelay={500} placement="top" >
                      <Icon>delete</Icon>
                    </Tooltip>
                  </IconButton>
                </PartnerBlock>
              )
            ) : ''
          }
        </PartnersWrap>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: idx(state, _ => _.partners.isLoading),
  partnersList: idx(state, _ => _.partners.list),
});

export default connect(mapStateToProps, { getPartnersList, deletePartnerItem })(PartnersPage);
