import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";






document.body.style.backgroundColor = "#ebf5ee";




const App = () => {
  
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API
  const country = "us";
  
  
  const [progress, setProgress] = useState(0)

  

  
  return (

    <div>



      <Router>

        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />

        <Navbar/>
        



        <Switch>

          <Route exact path="/"><News setProgress = {setProgress} apiKey = {apiKey}  key="technology"  pageSize={pageSize} country={country} category="technology"/></Route>

          <Route exact path="/business"><News setProgress = {setProgress} apiKey = {apiKey}  key="business"  pageSize={pageSize} country={country} category="business"/></Route>
          <Route exact path="/health"><News setProgress = {setProgress} apiKey = {apiKey}  key="health"  pageSize={pageSize} country={country} category="health"/></Route>
          <Route exact path="/sports"><News setProgress = {setProgress} apiKey = {apiKey}  key="sports"  pageSize={pageSize} country={country} category="sports"/></Route>
          <Route exact path="/science"><News setProgress = {setProgress} apiKey = {apiKey}  key="science"  pageSize={pageSize} country={country} category="science"/></Route>
          <Route exact path="/technology"><News setProgress = {setProgress} apiKey = {apiKey}  key="technology"  pageSize={pageSize} country={country} category="technology"/></Route>
          
        </Switch>



      </Router>
    </div>
  )
  
}

export default App