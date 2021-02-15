import React from "react";
import {toTitleCase} from "../../Utilities/helper"
import "./EmployeeLayout.css";
import ModalSelector from "../AppModals/Components/ModalSelector";
import usePagedList from "../../CustomHooks/usePagedList";
import useModals from "../../CustomHooks/useModals";

export default function EmployeeLayout() {
  const [itemList,page,inputValue,maxPageIndex,searchParam,handleInput,handleForm,setPage]= usePagedList("employee");
  const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,handleModals]=useModals();
  
  return (
    <div className="EL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName}
      />

      <div className="EL-con-header">
        <h2>My Employees</h2>
        <div>
          <form onSubmit={handleForm}>
            <input placeholder="Enter employee name" onChange={handleInput} value={inputValue}></input>
            <button>Search</button>
          </form>
        </div>
        <p style={{ display: itemList.length ? "none" : "block" }}>
           {searchParam ?  "No employee matches your search":"You are yet to add employees to your laundry" }
        </p>
      </div>

      <div style={{ display: itemList.length ? "block" : "none" }} >
        <div className="EL-table-con">
            <table className="EL-table">
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
                    <button  className="EL-btn-detail" name={`employee-detail//${employee.name}`} onClick={handleModals} 
                      id={"id//"+ employee.id} children={toTitleCase(employee.name)}
                    />
                  </td>
                  <td>{employee.revenue}</td>
                  <td>{employee.noOfCustomers}</td>
                  <td>
                    <button className="EL-btn-del EL-btn" name={`delete-employee//${employee.name}`} 
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
        <div className="EL-btn-pagination">
          <button
            style={{ display: parseInt(page) === 1 ? "none" : "block" }} className="EL-btn"
            onClick={() => {setPage((prev) => parseInt(prev) - 1);}} >
            Prev
          </button>
          <button
            style={{
              display: parseInt(page) === maxPageIndex ? "none" : "block",
            }}
            className="EL-btn"
            onClick={() => {
              setPage((prev) => parseInt(prev) + 1);
            }}
          >
            {" "}
            Next
          </button>
        </div>
        <p className="EL-ft">
          Showing page {page} of {maxPageIndex}
        </p>
      </div>
    </div>
  );
}
