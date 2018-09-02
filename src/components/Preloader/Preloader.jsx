import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: 0.7;
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  &.invisible {
    display: none;
  }
`;

const Preloader = (props) => (
  <Wrap className={props.show ? '' : 'invisible'}>
    <CircularProgress size={100} color="primary"/>
  </Wrap>
);

export default Preloader;