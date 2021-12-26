
import './App.css';
// context
import Issue from './features/Issue/Issue';

function App() {
  // const handleDeleteIssue = async (issueId) => {
  //   try {
  //     await axios.delete(`https://tony-json-server.herokuapp.com/api/todos/${issueId}`);
  //     deleteIssue(issueId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="App">
      <div className="container">
        <Issue />
      </div>
    </div>
  );
}

export default App;
