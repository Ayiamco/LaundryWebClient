import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../apis/EmployeeApi";
import "./EmployeeLayout.css";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function EmployeeLayout() {
  const [employeeList, setEmployeeList] = useState([]);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(useQuery().get("page"));
  const [searchParam,setSearchParam]=useState(useQuery().get("name"))
  const [inputValue,setInputValue]=useState("")
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  let history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
   function handleForm(e){
        e.preventDefault()
   }

   function handleInput(e){
       setInputValue(e.target.value)
       setSearchParam(e.target.value)
   }
  const getData = async () => {
    let resp = await getEmployees(page,searchParam);
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

  async function confirmDelete(e) {
    if (e.target.name === "delete-employee") {
      setIsModalOpen(true);
    } else if (e.target.name === "delete-no") {
      setIsModalOpen(false);
    } else if (e.target.name === "delete-yes") {
      let id = e.target.id;
      await deleteEmployee(id.split("//")[1]);
      getData();
      setIsModalOpen(false);
    }
  }

  return (
    <div className="EL-con">
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
                  <td>{employee.name}</td>
                  <td>{employee.revenue}</td>
                  <td>{employee.noOfCustomers}</td>
                  <td>
                    <button
                      data-id={employee.id}
                      className="EL-btn-edit EL-btn"
                      name="edit-employee"
                    >
                      Edit
                    </button>
                    <button
                      data-id={employee.id}
                      className="EL-btn-del EL-btn"
                      name="delete-employee"
                      onClick={confirmDelete}
                    >
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => {
                          return setIsModalOpen(false);
                        }}
                        shouldCloseOnOverlayClick={false}
                        className="EL-modal"
                        overlayClassName="EL-modal-overlay"
                      >
                        <div className="EL-popup">
                          <p className="EL-block">
                            Are you sure you want to delete
                          </p>

                          <div className="EL-popup-btm">
                            <button
                              className="EL-btn EL-btn-del"
                              id={"delete//" + employee.id}
                              onClick={confirmDelete}
                              name="delete-yes"
                            >
                              Yes
                            </button>
                            <button
                              onClick={confirmDelete}
                              name="delete-no"
                              className="EL-btn EL-btn-edit"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </Modal>
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
