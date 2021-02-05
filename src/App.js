import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Login from './Pages/login/login'
import Home from './Pages/home/home'
import Register from "./Pages/register/register"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PasswordChange from "./Pages/PasswordChange/PasswordChange";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route exact path ="/change-password" component={PasswordChange}></Route>
        
        
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>
        
    </Router>
      
  );
}

export default App;
