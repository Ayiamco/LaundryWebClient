import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css';
import Login from './components/login/login'
import Home from './components/home/home'
import Register from "./components/register/register"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        
        
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>
        
    </Router>
      
  );
}

export default App;
