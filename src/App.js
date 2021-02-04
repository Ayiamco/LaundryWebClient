import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css';
import Login from './Pages/login/login'
import Home from './Pages/home/home'
import Register from "./Pages/register/register"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/password-recovery" component={ForgotPassword}></Route>
        
        
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>
        
    </Router>
      
  );
}

export default App;
