import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Login from './Pages/login/login'
import Home from './Pages/home/home'
import Register from "./Pages/register/register"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PasswordChange from "./Pages/PasswordChange/PasswordChange";
import Employees from "./Pages/Employees/Employees";
import Services from "./Pages/Services/Services";
import Customers from  "./Pages/Customers/Customers";
import Invoices from "./Pages/Invoices/Invoices"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/dashboard" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route exact path ="/change-password" component={PasswordChange}></Route>
        <Route exact path ="/employees" component={Employees}></Route>
        <Route exact path ="/services" component={Services}></Route>
        <Route exact path ="/invoices" component={Invoices}></Route>
        <Route exact path ="/customers" component={Customers}></Route>
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>
        
    </Router>
      
  );
}

export default App;
