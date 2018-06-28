import React, { Component } from 'react';
import styled from 'styled-components';
import StyledTextField from '../StyledTextField';

import InputAdornment from '@material-ui/core/InputAdornment';

const PasswordToggle = styled.span`
  font-weight: 500;
  line-height: 16px;
  font-size: 10px;
  text-align: right;
  cursor: pointer;
`;

class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  togglePasswordVisible = () => {
    const { showPassword } = this.state;

    showPassword
      ? this.setState({ showPassword: false })
      : this.setState({ showPassword: true });
  };

  render() {
    const { showPassword } = this.state;

    return (
      <StyledTextField
        {...this.props}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <PasswordToggle onClick={this.togglePasswordVisible}>
              {showPassword
                ? 'скрыть'
                : 'показать'}
            </PasswordToggle>
          </InputAdornment>
        }
      />
    );
  }
}

export default PasswordField;
