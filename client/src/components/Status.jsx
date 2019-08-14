import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 50px;
  border: 1px solid #827b7b;
  border-radius: 5px;
  padding: 20px;
`

function Status(props) {
  const { fname, lname, email, iban } = props.fields
  return (
    <React.Fragment>
      <StyledContainer>
        <h2>Input Status</h2>
        <p>
          Current First Name: <b>{fname}</b>
        </p>
        <p>
          Current Last Name: <b>{lname}</b>
        </p>
        <p>
          Current Email: <b>{email}</b>
        </p>
        <p>
          Current IBAN: <b>{iban}</b>
        </p>
      </StyledContainer>
    </React.Fragment>
  )
}

Status.propTypes = {
  fields: PropTypes.shape({
    fname: PropTypes.string,
    lname: PropTypes.string,
    email: PropTypes.string,
    iban: PropTypes.string
  })
}

export default Status
