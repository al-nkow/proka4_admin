import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {primary} from '../../../utils/colors';
import {createDoc, deleteDoc, getDocsList} from '../../../redux/actions/documents';
import idx from 'idx';

import ConfirmActionDialog from '../../ConfirmActionDialog';
import Toast from '../../Toast';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const MAX_UPLOADED_FILE_SIZE = 1024 * 1024 * 2;

const StyledPaper = styled(Paper)`
  box-sizing: border-box;
  padding: 15px 52px 15px 15px;
  margin-bottom: 10px;
  max-width: 700px;
  position: relative;
  .delete-button {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;

const StyledIcon = styled(Icon)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  font-size: 24px;
  margin-top: -3px;
`;

const StyledDropzone = styled(Dropzone)`
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px dashed ${primary.main};
  max-width: 700px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #e4e5ef;
  }
`;

const DropText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: ${primary.main};
  margin-bottom: 5px;
`;

const DropNotice = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: ${primary.main};
`;

const StyledLink = styled.a`
  display: block;
  &:hover {
    color: ${primary.main};
  }
`;

class DocumentBlock extends Component {
  state = {
    docToDelete: '',
    openToast: false,
    error: false
  };

  setDocToDelete = d => this.setState({ docToDelete: d });

  fileAdded = async (name, file) => {
    if (!name || !file) return;
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('document', file[0]);
    try {
      await this.props.createDoc(bodyFormData);
      this.setState({
        toastType: 'success',
        toastMessage: 'Документ успешно добавлен',
        openToast: true,
      });
    } catch(error) {
      console.log('CREATE DOCUMENT ERROR: ', error.response);
      const errMsg = 'Ошибка при попытке загрузить документ';
      this.setState({
        toastType: 'alert',
        toastMessage: errMsg,
        openToast: true,
      });
    }
  };

  deleteDoc = async () => {
    const { docToDelete } = this.state;
    try {
      await this.props.deleteDoc(docToDelete._id);
      this.setState({
        toastType: 'success',
        toastMessage: 'Документ успешно удалён',
        openToast: true,
        docToDelete: null
      });
    } catch(error) {
      console.log('DELETE DOCUMENT ERROR: ', error);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка при удалении документа',
        openToast: true,
        docToDelete: null
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

  render() {
    const { docToDelete, toastType, toastMessage, openToast } = this.state;
    const { doc, name, title, loading } = this.props;

    return (
      <div>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <ConfirmActionDialog
          message={`Вы действительно хотите удалить документ "${title}"?`}
          open={!!docToDelete}
          onCloseHandler={() => this.setDocToDelete('')}
          action={this.deleteDoc}
        />
        {
          doc && !loading ? (
            <StyledPaper>
              <StyledLink href={baseURL + doc.link} target="_blank">
                <StyledIcon>description</StyledIcon>
                { title }
              </StyledLink>
              <IconButton
                className="delete-button"
                aria-label="Delete"
                color="primary"
                onClick={() => this.setDocToDelete(doc) }
              >
                <Tooltip title="Удалить партнёра" enterDelay={500} placement="top" >
                  <Icon>delete</Icon>
                </Tooltip>
              </IconButton>
            </StyledPaper>
          ) : !loading ? (
            <StyledDropzone
              multiple={false}
              maxSize={MAX_UPLOADED_FILE_SIZE}
              accept=".pdf"
              onDrop={(files) => this.fileAdded(name, files)}
            >
              <DropText>{title}</DropText>
              <DropNotice>
                Перетащите файл в эту зону или нажмите чтобы выбрать.
                Разрешена загрузка файлов с расширением .pdf. Размер файла не должен превышать 2Мб
              </DropNotice>
            </StyledDropzone>
          ) : ''
        }
      </div>
    )
  };
}

const mapStateToProps = state => ({
  isLoading: idx(state, _ => _.documents.isLoading),
  documentsList: idx(state, _ => _.documents.list),
});

export default connect(mapStateToProps, { createDoc, getDocsList, deleteDoc })(DocumentBlock);