import React from 'react'
import Form from './Form'
import renderer from 'react-test-renderer'

const validation = {
  fname: true,
  lname: true,
  email: true,
  iban: true,
  isTouched: false
}

it('renders correctly', () => {
  const tree = renderer.create(<Form validation={validation} />).toJSON()
  expect(tree).toMatchSnapshot()
})
