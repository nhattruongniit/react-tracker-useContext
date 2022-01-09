import { createContext, useContext, useEffect, useState } from 'react'

// services
import httpRequest from '../services/httpRequest';

// reducers
// import { issueReducers, initialState } from '../reducers/issueReducers';

const IssuesContext = createContext()

const IssueProvider = ({ children }) => {
  // const [, dispatch] = useReducer(issueReducers, initialState);
  const [issues, setIssues] = useState([]); 
  const [issuesFiltered, setIssuesFiltered] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(10);

  // fetch issues
  const fetchData = async (_page) => {
    if(issues.length === totalCount) {
      setIsLoading(false);
      return;
    };

    const res = await httpRequest.get(`https://tony-json-server.herokuapp.com/api/todos?_page=${_page}&_limit=5`);
    const data = res.data.data;
    setIssues(prevState => [...prevState, ...data]);
    setTotalCount(res.data.pagination.totalCount);
  }

  useEffect(() => {
    fetchData(page)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // filter & search
  useEffect(() => {
    if (issues.length === 0) return;

    let newIssues = issues; 

    if(filterBy === 'new') {
      newIssues = newIssues
        .filter(issue => issue.status === filterBy) 
    }
    if(filterBy === 'close') {
      newIssues = newIssues
        .filter(issue => issue.status === filterBy)
    }

    newIssues = newIssues
      .filter(issue => issue.description.toLowerCase().includes(textSearch.toLowerCase()))
      // .sort((m1, m2) => {
      //   if(orderBy === 'asc' && m2.description > m1.description) {
      //    return -1
      //   };
      //   return 1
      // })

    setIssuesFiltered(newIssues);
  }, [issues, textSearch, orderBy, filterBy])

  // add issues
  async function addIssue(issue) {
    try {
      const res = await httpRequest.post('https://tony-json-server.herokuapp.com/api/todos', issue);
      const data = res.data.data;
      setIssues(prevState => [data, ...prevState])
    } catch (error) {
      console.error(error);
    }
  }

  // delete issues
  async function deleteIssue(issueId) {
    try {
      await httpRequest.delete(`https://tony-json-server.herokuapp.com/api/todos/${issueId}`);
      const newIssues = [...issues];
      const issueIndex = newIssues.findIndex(issue => issue.id === issueId);
      newIssues.splice(issueIndex, 1);
      setIssues(newIssues)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <IssuesContext.Provider
      value={{
        issues,
        issuesFiltered,
        addIssue,
        deleteIssue,
        setTextSearch,
        setOrderBy,
        setFilterBy,
        setPage,
        isLoading
      }}
    >
      {children}
    </IssuesContext.Provider>
  )
}

const useIssueContext = () => useContext(IssuesContext)

export {
  IssueProvider,
  useIssueContext,
}