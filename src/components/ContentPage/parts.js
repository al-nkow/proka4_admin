import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { error, primary } from '../../utils/colors';

export const ProgramTitle = styled.div`
  color: ${primary.main};
  font-size: 20px;
  margin-bottom: 20px;
  .num {
    border: 2px solid ${primary.main};
    color: ${primary.main};
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    float: left;
    font-size: 18px;
  }
`;

export const ProgramBlock = styled.div`
  padding-top: 40px;
`;

export const PageHead = styled.div`
  height: 40px;
  padding: 10px;
`;

export const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  max-width: 600px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
  border-bottom: 2px solid #efefef;
  padding-bottom: 10px;
  color: #67959a;
`;

export const FormRow = styled.div`
  margin-bottom: 20px;
  &.hasicon {
    display: flex;
    flex-direction: row;
  }
`;

export const Error = styled.div`
  padding: 10px;
  color: ${error.main};
`;

export const Part = styled.div`
  box-sizing: border-box;
  width: 50%;
  &:nth-child(odd) {
    padding-right: 10px;
  }
  &:nth-child(even) {
    padding-left: 10px;
  }
`;

export const PartsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;