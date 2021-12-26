import React from 'react'
import { FormGroup, Label, Col, Input } from 'reactstrap';

function TextField({ label, name, value, onChange, placeholder }) {
  return (
    <FormGroup row>
      <Label
        for="describeIssue"
        sm={1}
      >
        {label}
      </Label>
      <Col sm={12}>
        <Input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </Col>
    </FormGroup>
  )
}

export default TextField
