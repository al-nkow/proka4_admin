import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

const StyledDialogTitle = styled(DialogTitle)`
  && {
    h2 {
      font-size: 20px;
      color: #333333;
      font-weight: 400;
    }
  }
`;

class ConfirmActionDialog extends React.Component {
  render() {
    const {
      onCloseHandler,
      open,
      message,
      action
    } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={onCloseHandler}
        >
          <StyledDialogTitle>Подтвердите действие</StyledDialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseHandler} color="primary">
              Отмена
            </Button>
            <Button onClick={action} color="primary">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmActionDialog;