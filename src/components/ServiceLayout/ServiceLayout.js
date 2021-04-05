import React from 'react';
import { useHistory } from "react-router-dom";
import ModalSelector from "../../components/AppModals/Components/ModalSelector";
import usePagedList from "../../CustomHooks/usePagedList";
import useModals from "../../CustomHooks/useModals";
import {toTitleCase} from "../../Utilities/helper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "../../Utilities/utilities.css";

export default function ServiceLayout() {
    const[itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
        handleInput,handleForm,setPage,isNetworkError,setItemList] = usePagedList("service");
    const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,GenerateModal]=useModals();
    const history=useHistory();
    
    function MoveToEditPage(e){
      if(e.target.name.includes("edit-service")){
      history.push(`/service/edit?id=${e.target.id.split("/")[1]}`)
      return;
    }
    }
    
  return (
    <div className="ECSL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName} setItemList={setItemList}
      />
      
      {
        isLoading ? <LoadingSpinner isNetworkError={isNetworkError} ></LoadingSpinner>: 
        itemList.length===0 && !searchParam ? 
        <div className="ECSL-con-header">
          <h2>My Services</h2>
          <h4 style={{marginTop:"1em"}}>You are yet to add services to your account</h4>
          <div>
            <button onClick={()=> {return history.push("/service/new")}}  
              id="btn-add-employee">Add First Service</button>
          </div>
        </div>
        :
        <div>
            <div className="ECSL-con-header">
              <h2>My Services</h2>
              <div>
                <form onSubmit={handleForm}>
                  <input placeholder="Enter Customer name" onChange={handleInput} value={inputValue}></input>
                  <button className="ECSL-con-header-btn ECSL-btn">Search</button>
                </form> 
              </div>
              <div>
                <p className="center" style={{ display: itemList.length===0 ? "block" : "none" }}>
                  No service matches your search
                </p>
              </div>
            </div>
            <div className="ECSL-table-con" style={{ display: itemList.length===0  ?  "none": "block" }}>
                <table className="ECSL-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                       <th>Revenue</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
            {itemList.map((service) => {
              return (
                <tr key={service.id}>
                  <td>
                    <button  className="ECSL-btn-detail" name={`service-details//${service.name}`}  
                      id={"id//"+ service.id} children={toTitleCase(service.name)} onClick={GenerateModal}
                    />
                  </td>
                  <td> &#8358;{service.price}</td>
                  <td>{service.revenue}</td>
                  <td>
                    <button className="ECSL-btn-del ECSL-btn" name={`delete-service//${service.name}`} 
                      id={"id//"+ service.id} onClick={GenerateModal}> 
                      Delete
                    </button>
                    <button className="ECSL-btn-edit ECSL-btn" name={`edit-service//${service.name}`} 
                      id={"id/"+ service.id} onClick={MoveToEditPage}> 
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
              </table>
            </div>
            <div className="ECSL-btn-pagination" style={{ display: itemList.length===0  ?  "none": "flex" }}>
              <button
                  style={{ display: parseInt(page) === 1 ? "none" : "block" }} className="ECSL-btn"
                  onClick={() => {setPage((prev) => parseInt(prev) - 1);}} >
                  Prev
              </button>
              <button
                  style={{display: parseInt(page) === maxPageIndex ? "none" : "block"}}
                  className="ECSL-btn" onClick={() => {setPage((prev) => parseInt(prev) + 1);}}
              >
                Next
              </button>
            </div>
            <p className="ECSL-ft" style={{ display: itemList.length===0  ?  "none": "block" }}>
              Showing page {page} of {maxPageIndex}
            </p>
        </div>
       
      }
    
    </div>
  );
}
