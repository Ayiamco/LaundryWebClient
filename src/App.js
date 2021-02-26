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


// import React,{useCallback,useEffect,useState} from 'react';
// import InvoiceItem from "../InvoiceItem/InvoiceItem";
// import {getAllServices} from "../../apis/ServiceApi"

// export default function AddInvoice() {
//     const [services,setServices]=useState([]);
//     const [servicesObj,setServicesObj]=useState({})
//     const [invoiceItems,setInvoiceItems]=useState([])
//     const [itemCount,setItemCount]=useState(1)
//     const [formData,setFormData]=useState({
//         "1":{
//             isDeleted:false,
//             data:{
//                 serviceId:"",
//                 quantity:0,
//             }
//         }
//     })
    
//     console.log(formData,itemCount)

//     let getServices=useCallback( async ()=>{
//         let resp = await getAllServices()
//         let dataObj= {}
//         if(resp.statusCode==="200"){
//             setServices(resp.data)
//             for(let item in resp.data){
//                 dataObj[resp.data[item].id]= resp.data[item]
//             }
//         }
//         setServicesObj(dataObj)
//     },[])

//     function addItem(e){
//         setItemCount(count=>(count + 1));
//         setInvoiceItems(prev=>(
//             [...prev,<InvoiceItem services={services} id={`${itemCount +1}`} 
//                 setFormData={setFormData} formData={formData}  key={`${itemCount +1}`} 
//                 servicesObj={servicesObj}/>]))
//         setFormData(prev=>({...prev,
//                     [`${itemCount + 1}`]:{
//                             isDeleted:false,
//                             data:{
//                                 serviceId:"",
//                                 quantity:0,
                               
//                             }
//                         }
//                     }
//             ))
//     }

//     useEffect(()=>{
//         getServices();
//     },[getServices])
//     return (
//         <div>
//             <form>
//                 <InvoiceItem services={services} id="1"  setFormData={setFormData}
//                  formData={formData} servicesObj={servicesObj}/>
//                 <div className="AI-items-con"  children={invoiceItems}/>
//             </form>
            
             
           
//             <button onClick={addItem}>Add InvoiceItem</button>
//         </div>
//     )
// }
