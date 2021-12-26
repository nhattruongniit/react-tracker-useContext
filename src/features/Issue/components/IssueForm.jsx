import React, { useState } from 'react';
import { Form, FormGroup, Col, Button } from 'reactstrap';
import {v4 as uuidv4} from "uuid";

// components
import TextField from '../../../components/TextField';
import SelectField from '../../../components/SelectField';

// context
import { useIssueContext } from '../../../context/issueContext';

const defaultForm = {
  id: "",
  title: "Learn React",
  author: "Tony Nguyen",
  description: "",
  severity: "low",
  status: "new"
}

function IssueForm() {
  const [form, setForm] = useState(defaultForm);
  const { addIssue } = useIssueContext();

  function handleChangeForm(e) {
    const {name, value} = e.currentTarget;
    setForm(prevState => {
      return {
        ...prevState,
        [name]: value,
        id: uuidv4(),
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addIssue(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* issue */}
      <TextField 
        label="Description"
        name="description"
        placeholder="Describe the issue ... "
        onChange={handleChangeForm}
        value={form.description}
      />

      <SelectField 
        label="Severity"
        name="severity"
        onChange={handleChangeForm}
        value={form.severity}
        options={[
            {
                label: 'Low',
            },
            {
                label: 'Medium',
            },
            {
                label: 'High',
            }
        ]}
        renderOptions={item => (
            <option>
              {item.label}
            </option>
        )}
      />
      
      <FormGroup
        check
        row
      >
        <Col
          sm={{
              offset: 5,
              size: 2
          }}
        >
          <Button
            className='btn-submit'
            color='primary'
            // {form.description === '' || form.severity === '' && disabled}
            // disabled
          >
            Submit
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )
}

export default IssueForm
