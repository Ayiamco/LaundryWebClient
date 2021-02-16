import React from 'react';
import { useHistory } from "react-router-dom";
import ModalSelector from "../../components/AppModals/Components/ModalSelector";
import usePagedList from "../../CustomHooks/usePagedList";
import useModals from "../../CustomHooks/useModals";
import {toTitleCase} from "../../Utilities/helper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default function ServiceLayout() {
    const[itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
        handleInput,handleForm,setPage] = usePagedList("service");
    const [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,GenerateModal]=useModals();
    const history=useHistory();
    
    function MoveToEditPage(e){
      if(e.target.name.includes("edit-service")){
      history.push(`/service/edit?id=${e.target.id.split("/")[1]}`)
      return;
    }
    }
    
  return (
    <div className="EL-con">
      <ModalSelector isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={entityId} modalType={modalType} name={entityName}
      />
      <div className="EL-con-header">
        <h2>My Services</h2>
        </div>
      {
        isLoading ? <LoadingSpinner></LoadingSpinner>: 
        <div>
            <div>
              <form onSubmit={handleForm}>
                <input placeholder="Enter Customer name" onChange={handleInput} value={inputValue}></input>
                <button>Search</button>
              </form> 
            </div>
            <div>
              <p style={{ display: itemList.length ? "none" : "block" }}>
                {searchParam ?  "No service matches your search":"You are yet to add services to your laundry" }
              </p>
            </div>
            <div style={{ display: itemList.lenght  ?  "none": "block" }} >
                <div className="EL-table-con">
                   <table className="EL-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                {itemList.map((service) => {
                  return (
                    <tr key={service.id}>
                      <td>
                        <button  className="EL-btn-detail" name={`service-details//${service.name}`}  
                          id={"id//"+ service.id} children={toTitleCase(service.name)} onClick={GenerateModal}
                        />
                      </td>
                      <td>{service.price}</td>
                      <td>
                        <button className="EL-btn-del EL-btn" name={`delete-service//${service.name}`} 
                          id={"id//"+ service.id} onClick={GenerateModal}> 
                          Delete
                        </button>
                        <button className="EL-btn-edit EL-btn" name={`edit-service//${service.name}`} 
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
  );
}
