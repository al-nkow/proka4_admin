import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { error, primary } from '../../utils/colors';
// import Breakpoints from '../../utils/breakpoints';
// ${Breakpoints.medium} {
//   display: block;
// }

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1400px) {
    display: block;
  }
`;

export const Col = styled.div`
  width: 100%;
  &:nth-child(odd) {
    padding-right: 10px;
  }
  &:nth-child(even) {
    padding-left: 10px;
  }
  @media screen and (max-width: 1400px) {
    &:nth-child(odd) {
      padding-right: 0;
    }
    &:nth-child(even) {
      padding-left: 0;
    }
  }
`;

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
  font-size: 22px;
  margin-bottom: 30px;
`;

export const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1400px) {
    max-width: 600px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
  border-bottom: 2px solid #efefef;
  padding-bottom: 10px;
  color: #67959a;
  display: flex;
  flex-direction: row;
  position: relative;
  .save {
    position: absolute;
    bottom: 0;
    right: 0;
  }
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