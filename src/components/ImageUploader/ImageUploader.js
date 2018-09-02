import React, {Fragment} from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import { primary } from '../../utils/colors';

const Noimage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoimageIcon = styled(props => (
  <Icon {...props} style={{fontSize: 32}}>
    add_photo_alternate
  </Icon>
))`
  color: #a1a1a1;
`;

const ImgWrap = styled(({src, ...rest}) => <div {...rest} />)`
  background-image: url(${({src}) => src});
  background-position: center;
  background-color: #e0e0e0;
  background-size: cover;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border-radius: 4px;
`;

const AddImageButton = styled(props => <Button variant="raised" {...props} />)`
  && {
    background-color: #ffffff;
    color: ${primary.main}; //#4789ab;
    min-width: 140px;
    margin-top: 7px;
    margin-bottom: 10px;
  }
`;

const ImagePreview = styled(({img, className}) => (
  <div className={className}>
    {img ? (
      <ImgWrap src={img.preview}/>
    ) : (
      <Noimage>
        <NoimageIcon/>
      </Noimage>
    )}
  </div>
))`
  display: block;
  margin-right: 24px;
`;

const Wrapper = styled.div`
  display: block;
`;

const Notice = styled.p`
  margin: 6px 0 0;
  font-size: 12px;
  color: #333333;
`;

const ImageUploader = styled(
  ({
     className,
     input,
     previewObj,
     dropzoneProps,
     name,
     noticeText,
     ...rest,
   }) => {
    return (
      <Fragment>
        <Dropzone
          className={className}
          name={name}
          {...dropzoneProps}
          onDrop={(files, e) => input.onChange(files)}
          >
          <ImagePreview
            img={input.value ? input.value[0] : previewObj ? previewObj : null}
          />
          <Wrapper>
            <AddImageButton onClick={null}>
              {input.value ? 'Обновить' : 'Выбрать файл'}
            </AddImageButton>
            <Notice>{noticeText}</Notice>
          </Wrapper>
        </Dropzone>
      </Fragment>
    )
  }
)`
  display: flex;
  align-items: flex-start;
`;

export default ImageUploader;
