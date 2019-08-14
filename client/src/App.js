import React, { useState } from 'react'
import Form from './components/Form'
import Status from './components/Status'
import { checkIban } from './services/API'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

//As I'm using styled components this section is for styles declaration
const StyledContainer = styled.div`
  background-color: #f5f5f5
  min-height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: top
  font-size: calc(10px + 2vmin)
  color: white
  padding-top: 50px
`

const StyledHeader = styled.h1`
  text-align: center
`

//And here is our root component, notice that it is a pure function, that manages state via hooks
function App () {
  // creating hooks with stets as objects
  const [fields, setFields] = useState({
    fname: '',
    lname: '',
    email: '',
    iban: 'UA903052992990004149123456789' // test value, valid iban, can be ommited
  })
  const [validation, setValidation] = useState({
    fname: true,
    lname: true,
    email: true,
    iban: true,
    isTouched: false
  })
  const [isMessageOpen, setMessageOpen] = useState(false)

  function handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    // here we pass a function to hook instead of simple value, as we need to update only relevant keys,
    // and standart logic for hook update overwrites previous values, so we use spread instead
    setFields(prevState => { 
      return { ...prevState, [name]: value }
    })
  }

  function handleValidation(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    if (target.name === 'email'){
      setValidation(prevState => {
        // regexp to check for valid email
        return { ...prevState, [name]: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        isTouched: true }
      })
    } else if (target.name === 'iban') {
        try {
        checkIban(fields.iban).then(res => setValidation(prevState => {
          return { ...prevState, [name]: res.valid, isTouched: true }
        }))} catch (e) {
          console.log(e)
        }
    } else {
      setValidation(prevState => {
        return { ...prevState, [name]: /^[A-Za-z]+$/.test(value), isTouched: true }
      })
    }
  }

  function handleSubmit (event) {
    if (event) event.preventDefault()
    if (validation.fname && validation.lname && validation.email && validation.iban && validation.isTouched){
      // awesome, everything is fine
      console.log(`Successfuly submitted: ${JSON.stringify(fields)}`)
    }
    messageToggle() //notify user about success or failure
  }

  function messageToggle() {
    setMessageOpen(prevState => !prevState)
  }

  return (
    <React.Fragment>
      <StyledContainer>
        <Paper>
          <StyledHeader>
            Register account
          </StyledHeader>
          <Form 
            handleInputChange={handleInputChange} 
            handleSubmit={handleSubmit} 
            fields={fields} 
            validation={validation}
            isMessageOpen={isMessageOpen}
            messageToggle={messageToggle}
            handleValidation={handleValidation}/>
        </Paper>
          <Status fields={fields}/>
      </StyledContainer>
    </React.Fragment>
  )
}

export default App
