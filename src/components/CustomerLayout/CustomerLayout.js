import React,{useState} from 'react'
import usePagedList from "../../CustomHooks/usePagedList";
import {toTitleCase} from "../../Utilities/helper"


export default function CustomerLayout() {
    const[itemList,page,searchParam,inputValue,maxPageIndex,
        setInputValue,handleInput,handleForm,setPage] = usePagedList("customers");
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [employeeId,setEmployeeId]=useState("");
    // const [employeeName,setEmployeeName]=useState("");
    // const [modalType,setModalType]=useState("")
    

    // async function handleModals(e) {
    //     let id = e.target.id.split("//")[1];
    //     setEmployeeName(e.target.name.split("//")[1])
    //     if (e.target.name.includes("delete-employee")) {
    //         setModalType("DeleteEmployeeModal")
    //     } 
    //     else if(e.target.name.includes("employee-detail")){ 
    //     setModalType("EmployeeDetailsModal")
    //     }
    //     console.log(id)
    //     setEmployeeId(id);
    //     setIsModalOpen(true);
    // }

  return (
    <div className="EL-con">
      {/* <EmployeeLayoutModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={employeeId} modalType={modalType} name={employeeName}
      >
      </EmployeeLayoutModal> */}
      <div className="EL-con-header">
        <h2>My Customers</h2>
        <div>
          <form onSubmit={handleForm}>
            <input placeholder="Enter Customer name" onChange={handleInput} value={inputValue}></input>
            <button>Search</button>
          </form> 
        </div>
      </div>

      <div style={{ display: itemList.lenght === 0 ? "none" : "block" }} >
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
                    <button  className="EL-btn-detail" name={`employee-detail//${customer.name}`}  
                      id={"id//"+ customer.id} children={toTitleCase(customer.name)}
                    />
                  </td>
                  <td>{customer.totalPurchase}</td>
                  <td>
                    <button className="EL-btn-del EL-btn" name={`delete-employee//${customer.name}`} 
                       id={"id//"+ customer.id}>
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
