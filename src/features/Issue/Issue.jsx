import React from 'react';

// components
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

function Issue() {

  return (
    <>
      <h2 className='head-title'>ISSUES TRACKER</h2>

      <IssueForm />

      <br /><br />
      
      <IssueList/>
    </>
  )
}

export default Issue
