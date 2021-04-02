import React from 'react'
import useModals from '../../CustomHooks/useModals';
import usePagedList from "../../CustomHooks/usePagedList";
import {toTitleCase} from "../../Utilities/helper"
import ModalSelector from '../AppModals/Components/ModalSelector';
import {useHistory} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


export default function CustomerLayout() {
    const[itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
        handleInput,handleForm,setPage,isNetworkError] = usePagedList("customer");
    const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,GenerateModal]=useModals();
    const history=useHistory();
    
    function MoveToEditPage(e){
      if(e.target.name.includes("edit-customer")){
      history.push(`/customer/edit?id=${e.target.id.split("/")[1]}`)
      return;
    }
    }
    
  return (
    <div className="ECSL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName}
      />
      
      {
        isLoading ? <LoadingSpinner isNetworkError={isNetworkError}></LoadingSpinner>: 
        <div>
           <div className="ECSL-con-header">
              <h2>My Customers</h2>
              <div>
                <form onSubmit={handleForm}>
                  <input placeholder="Enter Customer name" onChange={handleInput} value={inputValue}></input>
                  <button className="ECSL-con-header-btn ECSL-btn">Search</button>
                </form> 
              </div>
              <div>
                <p style={{ display: itemList.length===0 ? "block" : "none" }}>
                  {searchParam ?  "No Customer matches your search": "You are yet to add services to your laundry" }
                </p>
              </div>
            </div>
          <div>
          <div className="ECSL-table-con" style={{ display: itemList.lenght  ?  "none": "block" }} >
              <table className="ECSL-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Purchase</th>
                    <th>Date Added</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((customer) => {
                    return (
                      <tr key={customer.id}>
                        <td>
                          <button  className="ECSL-btn-detail" name={`customer-details//${customer.name}`}  
                            id={"id//"+ customer.id} children={toTitleCase(customer.name)} onClick={GenerateModal}
                          />
                        </td>
                        <td>{customer.totalPurchase}</td>
                        <td>{new Date(customer.createdAt.slice(0,10)).toDateString()}</td>
                        <td>
                          <button className="ECSL-btn-del ECSL-btn" name={`delete-customer//${customer.name}`} 
                            id={"id//"+ customer.id} onClick={GenerateModal}> 
                            Delete
                          </button>
                          <button className="ECSL-btn-edit ECSL-btn" name={`edit-customer//${customer.name}`} 
                            id={"id/"+ customer.id} onClick={MoveToEditPage}> 
                            Edit
                          </button>
                          <button className="ECSL-btn" name={`customer-pay//${customer.name}`} 
                            id={"id//"+ customer.id} onClick={GenerateModal}> 
                            Pay
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
             </table>
          </div>
          <div className="ECSL-btn-pagination">
              <button style={{ display: parseInt(page) === 1 ? "none" : "block" }} className="ECSL-btn"
                  onClick={() => {setPage((prev) => parseInt(prev) - 1)}}> Prev
              </button>
              <button style={{display: parseInt(page) === maxPageIndex ? "none" : "block"}}
                  className="ECSL-btn" onClick={() => {setPage((prev) => parseInt(prev) + 1)}}> Next
              </button>
          </div>
          <p className="ECSL-ft">
            Showing page {page} of {maxPageIndex}
          </p>
        </div>

        </div>
      }
      
      
    </div>
  );
}
