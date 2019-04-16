import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const PageHead = styled.div`
  height: 40px;
    font-size: 22px;
    margin-bottom: 30px;
`;

const client_id = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
const redirect_uri = 'https://proka4show.ru/';
const link = 'https://api.instagram.com/oauth/authorize/';
const url = `${link}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&hl=en`;

const InstaPage = () => {
  return (
    <Fragment>
      <PageHead>
        Instagram
      </PageHead>
      <p>Перейдите по ссылке чтобы получить access token</p>
      <Button variant="contained" color="primary" href={url} target="_blank">
        Авторизоваться
      </Button>
    </Fragment>
  )
}

export default InstaPage;

// https://api.instagram.com/oauth/authorize/?client_id=___&redirect_uri=https://proka4show.ru/&response_type=token&hl=en
