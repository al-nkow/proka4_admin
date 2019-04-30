import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { saveAccessToken } from '../../redux/actions/instagram';
import idx from 'idx';
import Toast from '../Toast';

const PageHead = styled.div`
  height: 40px;
  font-size: 22px;
  margin-bottom: 30px;
`;

const client_id = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
const redirect_uri = 'https://proka4show.ru/admin/instagram/';
const link = 'https://api.instagram.com/oauth/authorize/';
const url = `${link}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&hl=en`;

class InstaPage extends PureComponent {
  state = {
    openToast: false,
    toastType: null,
    toastMessage: null,
  };

  componentDidMount() {
    const hash = idx(this, _ => _.props.location.hash);
    if (hash) {
      const token = hash.split('=')[1];
      this.SaveToken(token);
    }
  }

  SaveToken = async (token) => {
    const { saveAccessToken } = this.props;

    try {
      const resp = await saveAccessToken({ token });
      if (resp.status === 200) {
        this.setState({
          toastType: 'success',
          toastMessage: 'ACCESS TOKEN успешно сохранён',
          openToast: true,
          userToDelete: ''
        });
      }
    } catch(error) {
      console.log('SAVE TOKEN ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при сохранении ACCESS TOKEN',
        openToast: true,
        userToDelete: ''
      });
    }
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  render() {
    const {  openToast, toastMessage, toastType } = this.state;

    return (
      <Fragment>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <PageHead>
          Instagram
        </PageHead>
        <p>
          На сайте используется API инстаграм для вывода последних постов а также получения отзывов.
          Недавно Instagram изменил правила использования и теперь предоставляет access token с
          ограниченным временем действия, при этом срок окончания действия неизвестен.
          Всвязи с этим в случае необходимости (например не выводятся последние посты)
          нужно обновить токен самостоятельно. Для этого:<br/><br/>
          1. Нажать на кнопку ниже - откроется страница авторизации instagram<br/>
          2. Ввести логин и пароль<br/>
          3. В появившемся окне нажать кнопку Подтвердить доступ<br/>
          4. Произойдет редирект на страницу админ панели и появится сообщение об
          успешном обновлении токена.<br/>
        </p>
        <Button variant="contained" color="primary" href={url} target="_blank">
          Авторизоваться
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: idx(state, _ => _.faq.isLoading),
  token: idx(state, _ => _.instagram.token),
});

export default connect(mapStateToProps, { saveAccessToken })(InstaPage);

// https://api.instagram.com/oauth/authorize/?client_id=___&redirect_uri=https://proka4show.ru/&response_type=token&hl=en
