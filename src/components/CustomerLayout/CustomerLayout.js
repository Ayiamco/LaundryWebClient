import React,{useState} from 'react'
import useModals from '../../CustomHooks/useModals';
import usePagedList from "../../CustomHooks/usePagedList";
import {toTitleCase} from "../../Utilities/helper"
import ModalSelector from '../AppModals/Components/ModalSelector';
import {useHistory} from "react-router-dom";


export default function CustomerLayout() {
    const[itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
        handleInput,handleForm,setPage] = usePagedList("customer");
    const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,GenerateModal]=useModals();
    const history=useHistory();
    
    function MoveToEditPage(e){
      if(e.target.name.includes("edit-customer")){
      history.push(`/customer/edit?id=${e.target.id.split("/")[1]}`)
      return;
    }
    }
    
  return (
    <div className="EL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName}
      />
      <div className="EL-con-header">
        <h2>My Customers</h2>
      {
        isLoading ? "": 
        <div>
            <div>
              <form onSubmit={handleForm}>
                <input placeholder="Enter Customer name" onChange={handleInput} value={inputValue}></input>
                <button>Search</button>
              </form> 
            </div>
            <div>
              <p style={{ display: itemList.length ? "none" : "block" }}>
                {searchParam ?  "No customer matches your search":"You are yet to add customers to your laundry" }
              </p>
            </div>
            <div style={{ display: itemList.lenght  ?  "none": "block" }} >
                <div className="EL-table-con">
                   <table className="EL-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Total Purchase</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                {itemList.map((customer) => {
                  return (
                    <tr key={customer.id}>
                      <td>
                        <button  className="EL-btn-detail" name={`customer-details//${customer.name}`}  
                          id={"id//"+ customer.id} children={toTitleCase(customer.name)} onClick={GenerateModal}
                        />
                      </td>
                      <td>{customer.totalPurchase}</td>
                      <td>
                        <button className="EL-btn-del EL-btn" name={`delete-customer//${customer.name}`} 
                          id={"id//"+ customer.id} onClick={GenerateModal}> 
                          Delete
                        </button>
                        <button className="EL-btn-edit EL-btn" name={`edit-customer//${customer.name}`} 
                          id={"id/"+ customer.id} onClick={MoveToEditPage}> 
                          Edit
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
      }
      </div>
      
    </div>
  );
}
