import React from "react";
import {toTitleCase} from "../../Utilities/helper";
import {useHistory} from "react-router-dom";
import "./EmployeeLayout.css";
import "../../Utilities/utilities.css"
import ModalSelector from "../AppModals/Components/ModalSelector";
import usePagedList from "../../CustomHooks/usePagedList";
import useModals from "../../CustomHooks/useModals";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function EmployeeLayout() {
  const [itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
    handleInput,handleForm,setPage,isNetworkError,setItemList]= usePagedList("employee");
  const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,handleModals]=useModals();
  const history= useHistory()

  function addEmployee(){
    console.log("ndlnkl")
    history.push('/employee/new')
  }
  return (
    <div className="ECSL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName} setItemList= {setItemList}
      />
     
      
      {
        isLoading ?
        <LoadingSpinner isNetworkError={isNetworkError}></LoadingSpinner> :
        itemList.length===0 && !searchParam ? 
        <div className="ECSL-con-header">
          <h2>My Employees</h2>
          <h4 style={{marginTop:"1em"}}>You are yet to add employees to your account</h4>
          <div>
            <button onClick={addEmployee} id="btn-add-employee">Add First Employee</button>
          </div>
        </div>
         : 
        <div>
          <div className="ECSL-con-header">
             <h2>My Employees</h2>
            <form onSubmit={handleForm}>
              <input placeholder="Enter employee name" onChange={handleInput} value={inputValue}></input>
              <button className="ECSL-con-header-btn ECSL-btn">Search</button>
            </form>
            </div>
            <p style={{ display: itemList.length ? "none" : "block" }}>
              No employee matches your search
            </p>
            <div style={{ display: itemList.length ? "block" : "none" }} >
          </div>
          
          
          <div className="ECSL-table-con">
              <table className="ECSL-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Revenue</th>
                <th>No of Customers</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>
                      <button  className="ECSL-btn-detail" name={`employee-details//${employee.name}`} onClick={handleModals} 
                        id={"id//"+ employee.id} children={toTitleCase(employee.name)}
                      />
                    </td>
                    <td>{employee.revenue}</td>
                    <td>{employee.noOfCustomers}</td>
                    <td>
                      <button className="ECSL-btn-del ECSL-btn" name={`delete-employee//${employee.name}`} 
                        onClick={handleModals} id={"id//"+ employee.id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          <div className="ECSL-btn-pagination">
            <button
              style={{ display: parseInt(page) === 1 ? "none" : "block" }} className="ECSL-btn"
              onClick={() => {setPage((prev) => parseInt(prev) - 1);}} >
              Prev
            </button>
            <button
              style={{
                display: parseInt(page) === maxPageIndex ? "none" : "block",
              }}
              className="ECSL-btn"
              onClick={() => {
                setPage((prev) => parseInt(prev) + 1);
              }}
            >
              {" "}
              Next
            </button>
          </div>
          <p className="ECSL-ft">
          Showing page {page} of {maxPageIndex}
        </p>
        
       </div>
    
     

      }
    
    </div>
  );
}
