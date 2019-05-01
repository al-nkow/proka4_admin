import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { error, primary } from '../../utils/colors';

export const PreviewImage = styled.a`
  transition: all 0.1s linear;
  &:hover {
    opacity: 0.8;
  }
`;

export const ReviewBlockControls = styled.div`
  text-align: right;
  margin: 0 -10px 0 -10px;
  position:relative;
`;

export const Order = styled.div`
  width: 22px;
  height: 22px;
  font-size: 14px;
  color: #ffffff;
  background: ${primary.main};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 11px;
  left: 11px;
  &.noorder {
    opacity: 0.2;
  }
`;

export const Controls = styled.div`
  margin-bottom: 30px;
`;

export const Comment = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
`;
export const CommentsWrap = styled.div`
  max-height: 200px;
  overflow: auto;
`;

export const Error = styled.div`
  padding: 40px 0;
  color: ${error.main};
`;

export const ReviewBlock = styled(Paper)`
  margin: 15px 15px 15px 0;
  padding: 0 10px 10px 10px;
  max-width: 200px;
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
`;

export const PageHead = styled.div`
  height: 40px;
  font-size: 22px;
  margin-bottom: 30px;
`;

export const NewsWrap = styled.div`
  padding-top: 40px;
`;

export const ImgWrap = styled.div`
  width: 200px;
  img {
    display: block;
    width: 100%;
  }
`;

export const NewsBody = styled.div`
  padding: 20px 10px 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-right: 15px;
`;

export const Created = styled.div`
  font-size: 14px;
  color: #777777;
`;

export const Actions = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;