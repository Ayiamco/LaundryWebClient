import React from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Login from './Pages/Login/Login'
import Home from './Pages/Home/home'
import Register from "./Pages/Register/register"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PasswordChange from "./Pages/PasswordChange/PasswordChange";
import Employee from "./Pages/Employee/Employee";
import Service from "./Pages/Service/Service";
import Customer from  "./Pages/Customer/Customer";
import Invoice from "./Pages/Invoice/Invoice";
import NewEmployee from "./Pages/NewEmployee/NewEmployee";
import NewService from "./Pages/NewService/NewService";
import NewCustomer from "./Pages/NewCustomer/NewCustomer";
import NewInvoice from "./Pages/NewInvoice/NewInvoice";
import EmployeeRegistration from "./Pages/EmployeeRegistration/EmployeeRegistration"
import SelectAccount from "./Pages/SelectAccount/SelectAccount"
import EditCustomer from "./Pages/EditCustomer/EditCustomer"
import EditService from "./Pages/EditService/EditService"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/dashboard" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route exact path ="/change-password" component={PasswordChange}></Route>
        <Route exact path ="/employees" component={Employee}></Route>
        <Route exact path ="/services" component={Service}></Route>
        <Route exact path ="/invoices" component={Invoice}></Route>
        <Route exact path ="/customers" component={Customer}></Route>
        <Route exact path ="/employee/new" component={NewEmployee}></Route>
        <Route exact path ="/service/new" component={NewService}></Route>
        <Route exact path ="/customer/new" component={NewCustomer}></Route>
        <Route exact path ="/invoice/new" component={NewInvoice}></Route>
        <Route exact path= "/employee/registration" component={EmployeeRegistration} />
        <Route exact path= "/account/select" component={SelectAccount} />
        <Route exact path="/customer/edit" component={EditCustomer}/>
        <Route exact path="/service/edit" component={EditService}/>
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>
        
    </Router>
      
  );
}

export default App;
