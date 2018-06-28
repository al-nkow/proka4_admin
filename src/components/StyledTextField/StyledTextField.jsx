import React from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const renderInput = ({
   input,
   type,
   startChar,
   thousandSeparator,
   fieldProps,
   endAdornment,
}) => {
  return (
    <React.Fragment>
      <Input
        type={type}
        {...input}
        {...fieldProps}
        className="input"
        startAdornment={
          !!startChar && (
            <InputAdornment position="start">{startChar}</InputAdornment>
          )
        }
        endAdornment={endAdornment}
      />
      {!!(fieldProps && fieldProps.multiline) && (
        <span className="counter">
          {input.value ? input.value.length : 0}/{fieldProps.inputProps
          ? fieldProps.inputProps.maxLength
          : 0}
        </span>
      )}
    </React.Fragment>
  );
};

const StyledTextField = styled(
  ({
     className,
     type,
     disabled,
     label,
     input,
     meta,
     startChar,
     fieldProps,
     helperText,
     endAdornment,
   }) => (
    <FormControl
      className={className}
      error={meta && meta.error && meta.touched}
      disabled={disabled}
    >
      {label && <InputLabel>{label}</InputLabel>}
      {renderInput({
        input,
        type,
        startChar,
        fieldProps,
        endAdornment,
      })}
      {(helperText || (meta && meta.error && meta.touched)) && (
        <FormHelperText>{helperText || meta.error}</FormHelperText>
      )}
    </FormControl>
  )
)`
  width: 100%;
  .counter {
    font-size: 12px;
    color: #333333;
    margin-top: 7px;
    text-align: end;
  }
`;

export default StyledTextField;
