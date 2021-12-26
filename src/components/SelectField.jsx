import React, { Fragment } from 'react'
import { FormGroup, Label, Col, Input } from 'reactstrap';

function SelectField({ label, name, value, options, renderOptions, onChange }) {
  return (
    <FormGroup row>
      <Label
        for={name}
        sm={1}
      >
        {label}
      </Label>
      <Col sm={12}>
        <Input
          type="select"
          name={name}
          onChange={onChange}
          value={value}
        >
          {options.map((item, index) =>(
            <Fragment key={index}>
              {renderOptions(item)}
            </Fragment>
          ))}
        </Input>
      </Col>
    </FormGroup>
  )
}

export default SelectField
