import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { error } from '../../utils/colors';

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
  margin: 10px;
  padding: 0 10px 10px 10px;
  max-width: 200px;
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
`;

export const PageHead = styled.div`
  height: 40px;
  padding: 10px;
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