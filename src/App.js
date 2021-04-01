import React from "react"
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import RegisterPage from "./Pages/RegisterPage/RegisterPage"
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

function checkAuthenticationStatus(){
  let token= localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
  return token;
}
const ProtectedRoute = ({ component: Component, path:returnUrl,...rest }) => {
  let hasAuthToken= checkAuthenticationStatus();
  if(hasAuthToken) return (<Route {...rest} path={returnUrl} render={props => 
    <Component {...rest} {...props} />} />)
  
  localStorage.setItem("returnUrl",returnUrl)
  return <Redirect to="/"></Redirect>
  
}

function App() {
  return (
    <Router>
      <Switch>
        {/* UnProtected routes list */}
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route exact path ="/change-password" component={PasswordChange}></Route>
        

        {/* Protected routes list */}
        <ProtectedRoute  exact path="/dashboard" component={HomePage} />
        <ProtectedRoute exact path ="/employees" component={Employee} />
        <ProtectedRoute exact path ="/services" component={Service}/>
        <ProtectedRoute exact path ="/invoices" component={Invoice} />
        <ProtectedRoute exact path ="/customers" component={Customer} />
        <ProtectedRoute exact path ="/employee/new" component={NewEmployee}/>
        <ProtectedRoute exact path ="/service/new" component={NewService}/>
        <ProtectedRoute exact path ="/customer/new" component={NewCustomer} />
        <ProtectedRoute exact path ="/invoice/new" component={NewInvoice} />
        <ProtectedRoute exact path= "/employee/registration" component={EmployeeRegistration} />
        <ProtectedRoute exact path= "/account/select" component={SelectAccount} />
        <ProtectedRoute exact path="/customer/edit" component={EditCustomer}/>
        <ProtectedRoute exact path="/service/edit" component={EditService}/>
        
        {/* Default Route */}
        <Route path='/*' >
          <h1>Error</h1>
        </Route>
      </Switch>

    </Router>

  );
}

export default App;
