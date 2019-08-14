import React from 'react'
import Status from './Status'
import renderer from 'react-test-renderer'

const fields = {
  fname: '',
  lname: '',
  email: '',
  iban: 'UA903052992990004149123456789' // test value, valid iban, can be ommited
}

it('renders correctly', () => {
  const tree = renderer.create(<Status fields={fields} />).toJSON()
  expect(tree).toMatchSnapshot()
})
