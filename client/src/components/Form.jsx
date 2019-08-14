import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledForm = styled.form`
  padding: 20px;

  .spacing {
    margin: 10px 0;
  }
`

const Form = props => {
  const { handleInputChange, handleValidation, messageToggle, isMessageOpen } = props
  let isFnameValid = props.validation.fname
  let isLnameValid = props.validation.lname
  let isEmailValid = props.validation.email
  let isIbanValid = props.validation.iban
  return (
    <StyledForm onSubmit={props.handleSubmit}>
      <TextField
        id='fname'
        name='fname'
        className='spacing'
        label='First Name'
        fullWidth
        variant='outlined'
        error={!isFnameValid}
        helperText={!isFnameValid ? 'First Name is required' : ''}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <TextField
        id='lname'
        name='lname'
        className='spacing'
        label='Last Name'
        fullWidth
        variant='outlined'
        error={!isLnameValid}
        helperText={!isLnameValid ? 'Last Name is required' : ''}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <TextField
        id='email'
        name='email'
        className='spacing'
        label='Email'
        fullWidth
        type='email'
        variant='outlined'
        error={!isEmailValid}
        helperText={!isEmailValid ? 'Value should be a valid email' : ''}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <TextField
        id='iban'
        name='iban'
        className='spacing'
        label='IBAN'
        fullWidth
        variant='outlined'
        defaultValue='UA903052992990004149123456789'
        error={!isIbanValid}
        helperText={!isIbanValid ? 'IBAN should be a valid' : ''}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <Button type='submit' fullWidth variant='outlined' color='primary'>
        Submit
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        variant='success'
        open={isMessageOpen}
        onClose={messageToggle}
        autoHideDuration={3000} // 3 seconds close timeout
        message={
          <span id='message-id'>
            {isFnameValid && isLnameValid && isEmailValid && props.validation.isTouched
              ? 'Congratz! All data is valid'
              : 'Fix problems with input data'}
          </span>
        }
      />
    </StyledForm>
  )
}

Form.propTypes = {
  validation: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleValidation: PropTypes.func,
  messageToggle: PropTypes.func,
  isMessageOpen: PropTypes.bool
}

export default Form
