import React from 'react'
import { FormGroup, Label, Col, Input, Button, ButtonGroup } from 'reactstrap';

// components
import IssueItem from './IssueItem';

// context
import { useIssueContext } from '../../../context/issueContext';

function IssueList() {
    const { setTextSearch, setOrderBy, setFilterBy } = useIssueContext();
    
    return (
      <div className='issueList'>
        <div className="list-header" row>
            <h3 className='list-title'>List Issues</h3>
            <Col sm={3}>
                <Input
                    type="search"
                    placeholder="Search by description... "
                    onChange={e => setTextSearch(e.target.value)}
                />
            </Col>
        </div>
        <FormGroup row>
          <Label
              for="severity"
              sm={2}
          >
              Filter: 
          </Label>
          <Col sm={2}>
              <ButtonGroup className='btn-group'>
                  <Button color='primary' onClick={() => setFilterBy('all')}>
                      All
                  </Button>
                  <Button color='success' onClick={() => setFilterBy('new')}>
                      New
                  </Button>
                  <Button onClick={() => setFilterBy('close')}>
                      Close
                  </Button>
              </ButtonGroup>
          </Col>
        </FormGroup>
      
        <FormGroup row>
          <Label
              for="severity"
              sm={2}
          >
              Order By:
          </Label>
          <Col sm={2}>
            <Input
              id="severity"
              name="severity"
              type="select"
              onChange={e => setOrderBy(e.target.value)}
            >
              <option value="asc">
                ASC
              </option>
              <option value="desc">
                DESC
              </option>
            </Input>
        </Col>
        </FormGroup>

        <IssueItem />
      </div>
    )
}

export default IssueList
