import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import Router from './Router';

function App() {

  useEffect(() => {
    exampleApiCall();
  }, [])

  // example of talking to the api
  async function exampleApiCall() {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/health`)
    console.log(result)
  }


  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
