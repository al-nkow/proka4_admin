import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import colors, { error } from '../../utils/colors';

export const Msg = styled.span`
  color: ${colors.green};
`;
export const MsgAlert = styled.span`
  color: ${error.main};
`;

const Toast = props => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={props.open}
      autoHideDuration={props.duration}
      onClose={props.handleClose}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        props.type === 'alert' ? (
          <MsgAlert id="message-id">{props.title}</MsgAlert>
        ) : (
          <Msg id="message-id">{props.title}</Msg>
        )
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.handleClose}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    />
  );
};

export default Toast;
