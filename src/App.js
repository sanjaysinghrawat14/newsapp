import './App.css';
import React, {  useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

  const App = () => {
  let pageSize = 5
  let apiKey = process.env.REACT_APP_TEST_VAR

  const [progress, setProgress] = useState(0);

  // state = {
  //   progress: 0
  // }

  const setMyProgress = (progress) => {
    setProgress(progress)
    //  setState({
    //   progress: progress
    //  })
  }

    return (
      <div>

      <Router>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress ={ setMyProgress}  apiKey={apiKey}  key="home" pageSize ={pageSize} country="in" category='general'/>} />
          <Route exact path="/business" element={<News setProgress ={ setMyProgress} apiKey={apiKey} key="business" pageSize ={pageSize} country="in" category='business'/>} />
          <Route exact path="/entertainment" element={<News setProgress ={ setMyProgress} apiKey={apiKey} key="entertainment" pageSize ={pageSize} country="in" category='entertainment'/>} />
          <Route exact path="/general" element={<News setProgress ={ setMyProgress} apiKey={apiKey} key="general" pageSize ={pageSize} country="in" category='general'/>} />
          <Route exact path="/health" element={<News setProgress ={ setMyProgress} apiKey={apiKey} key="health" pageSize ={pageSize} country="in" category='health'/>} />
          <Route exact path="/science" element={<News setProgress ={ setMyProgress}  apiKey={apiKey} key="science"  pageSize ={pageSize} country="in" category='science'/>} />
          <Route exact path="/sports" element={<News setProgress ={ setMyProgress} apiKey={apiKey}  key="sports" pageSize ={pageSize} country="in" category='sports'/>} />
          <Route exact path="/technology" element={<News setProgress ={ setMyProgress} apiKey={apiKey}  key="technology" pageSize ={pageSize} country="in" category='technology'/>} />
        </Routes>
      </Router>
      </div>
    )
  }

export default App