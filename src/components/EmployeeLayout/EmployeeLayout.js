import React,{useEffect,useState} from 'react';
import {useLocation,useHistory} from "react-router-dom";
import {getEmployees,deleteEmployee} from "../../apis/EmployeeApi";
import "./EmployeeLayout.css"
import Modal from 'react-modal';

Modal.setAppElement("#root")
export default function EmployeeLayout() {
    const [employeeList,setEmployeeList]=useState([])
    const [modalIsOpen,setIsModalOpen]=useState(false);
    const [page,setPage]=useState(useQuery().get("page"))
    let history=useHistory();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    
    const getData = async ()=>{
        console.log("function called",employeeList.length)
        let resp= await getEmployees(page);
        console.log(resp)
        if(resp.statusCode==="200"){
            setEmployeeList(resp.data.data);
            history.push("/employees?page="+ resp.data.pageNumber)
        }
    }

    useEffect(()=>{
        console.log("page:",page)
        getData()
    },[page])

    async function confirmDelete(e){
        if(e.target.name==="delete-employee"){
            setIsModalOpen(true)
        }
        else if(e.target.name==="delete-no"){
            setIsModalOpen(false);
        }

        else if(e.target.name==="delete-yes"){
            let id =e.target.id;
            let resp=await  deleteEmployee(id.split("//")[1])
            console.log(resp)
            getData()
            setIsModalOpen(false)
        }
        
    }

    return (
        <div className="EL-con">
            <h2>My Employees</h2>
            {
                 employeeList.lenght ===0 ? <div>You have not Added your employees</div> :
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
                    {
                       
                        employeeList.map((employee)=>{
                           return (
                             <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.revenue}</td>
                                <td>{employee.noOfCustomers}</td>
                                <td>
                                    <button data-id={employee.id} className="EL-btn-edit EL-btn" name="edit-employee">Edit</button>
                                    <button data-id={employee.id} className="EL-btn-del EL-btn" name="delete-employee" onClick={confirmDelete}>
                                        <Modal isOpen={modalIsOpen} onRequestClose={()=>{return setIsModalOpen(false)}}
                                        shouldCloseOnOverlayClick={false} className="modal" overlayClassName="modal-overlay"
                                        >
                                            <p>Are you sure you want to delete</p>
                                            <button className="EL-btn" id={"delete//"+employee.id} onClick={confirmDelete} name="delete-yes">Yes</button>
                                            <button  onClick={confirmDelete} name="delete-no" className="EL-btn">No</button>
                                        </Modal>
                                        Delete
                                    </button>
                                </td>
                                
                            </tr>  
                           ) 
                        })
                    }
                </tbody>

            </table>
            }
            <div className="EL-btn-pagination">
                <button className="EL-btn" onClick={()=>{setPage(prev=>(parseInt(prev) -1))}}> Prev</button>
                <button className="EL-btn" onClick={()=>{setPage(prev=>( parseInt(prev) +1))}}> Next</button>
            </div>
            
        </div>
    )
}
