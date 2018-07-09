import {error} from '../../utils/colors';
import styled from 'styled-components';
import Button from '@material-ui/core/Button/index';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //background: url("https://www.toptal.com/designers/subtlepatterns/patterns/doodles.png");
  background: -webkit-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -o-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -ms-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: -moz-linear-gradient(359deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
  background: linear-gradient(91deg, rgb(243, 92, 75) 0%, rgb(248, 131, 121) 60%, rgb(247, 125, 112) 100%);
`;

export const Content = styled.div`
  width: 400px;
`;

export const LoginForm = styled.div`
  padding: 20px;
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

export const FieldWrap = styled.div`
  margin-bottom: 20px;
`;

export const ButtonWrap = styled.div`
  padding: 20px 0; 
`;

export const StyledButton = styled(Button)`
  font-weight: 300;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: ${error.main};
  font-size: 14px;
  padding: 10px 0;
`;