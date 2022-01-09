import React, { useRef, useEffect } from 'react';
import { Spinner } from 'reactstrap'

// components
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

// context
import { useIssueContext } from '../../context/issueContext';


function Issue() {
  const { setPage, isLoading } = useIssueContext();
  const spinnerRef = useRef();

  useEffect(() => {
    if(!spinnerRef.current) return;

    let observerRefValue = null;
    let options = {
      root: null,
      rootMargin: '10px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if(!entry.isIntersecting) return;

      // set loadmore
      setPage(prevState => prevState + 1)
    }, options);
    observer.observe(spinnerRef.current);
    observerRefValue = spinnerRef.current;

    return () => {
      if(observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [setPage])

  return (
    <>
      <h2 className='head-title'>ISSUES TRACKER</h2>

      <IssueForm />

      <br /><br />
      
      <IssueList/>

      {isLoading && (
        <div ref={spinnerRef} className='spinner'>
          <Spinner animation="border" variant="primary" />
        </div>
      )}

    </>
  )
}

export default Issue
