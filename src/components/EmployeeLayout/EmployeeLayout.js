import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getEmployees} from "../../apis/EmployeeApi";
import {toTitleCase} from "../../Utilities/helper"
import "./EmployeeLayout.css";
import EmployeeLayoutModal from "../../components/AppModals/Components/EmployeeLayoutModal";

export default function EmployeeLayout() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(useQuery().get("page"));
  const [searchParam,setSearchParam]=useState(useQuery().get("name"))
  const [inputValue,setInputValue]=useState("")
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const [employeeId,setEmployeeId]=useState("");
  const [employeeName,setEmployeeName]=useState("");
  const [modalType,setModalType]=useState("")
  let history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
   function handleForm(e){
        e.preventDefault()
   }

   function handleInput(e){
       setInputValue(e.target.value)
       setSearchParam(e.target.value.toLowerCase())
   }
  const getData = async () => {
    let resp = await getEmployees(page,searchParam);
    console.log(resp)
    if (resp.statusCode === "200") {
      setEmployeeList(resp.data.data);
      setMaxPageIndex(resp.data.maxPageIndex);
      setPage(resp.data.pageIndex);

    if(searchParam!==null){
        history.push(`/employees?page=${resp.data.pageIndex}&name=${searchParam}`);
    }
    else{
        history.push(`/employees?page=${resp.data.pageIndex}`);
    }
      
    }
  };

  useEffect(() => {
    getData();
  }, [page,searchParam]);

  async function handleModals(e) {
    let id = e.target.id.split("//")[1];
    setEmployeeName(e.target.name.split("//")[1])
    if (e.target.name.includes("delete-employee")) {
      setModalType("DeleteEmployeeModal")
    } 
    else if(e.target.name.includes("employee-detail")){ 
      setModalType("EmployeeDetailsModal")
    }
    console.log(id)
    setEmployeeId(id);
    setIsModalOpen(true);
    
    
  }

  return (
    <div className="EL-con">
      <EmployeeLayoutModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        id={employeeId} modalType={modalType} name={employeeName}
      >

      </EmployeeLayoutModal>
      <div className="EL-con-header">
        <h2>My Employees</h2>
        <div>
          <form onSubmit={handleForm}>
            <input placeholder="Enter employee name" onChange={handleInput} value={inputValue}></input>
            <button>Search</button>
          </form>
        </div>
      </div>

      <div style={{ display: employeeList.lenght === 0 ? "none" : "block" }} >
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
            {employeeList.map((employee) => {
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
