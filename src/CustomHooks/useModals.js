import {useState} from 'react'
import {toTitleCase} from "../Utilities/helper"

export default function useModals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityId,setEntityId]=useState("");
  const [entityName,setEntityName]=useState("");
  const [modalType,setModalType]=useState("")
  
  async function SelectModal(e) {
    console.log("handle modal clicked by :",e.target.name)
    setEntityName(toTitleCase(e.target.name.split("//")[1]))
    if (e.target.name.includes("delete-employee")) {
      setModalType("EmployeeDeleteConfirmationModal")
    } 
    else if (e.target.name.includes("delete-customer")) {
      setModalType("CustomerDeleteConfirmationModal")
    } 
    else if(e.target.name.includes("employee-details")){ 
      setModalType("EmployeeDetailsModal")
    }
    else if(e.target.name.includes("customer-details")){
      setModalType("CustomerDetailsModal")
    }
    else if (e.target.name.includes("delete-service")){
      console.log(e.target.name)
      setModalType("ServiceDeleteConfirmationModal")
    }
    else if (e.target.name.includes("service-details")){
      setModalType("ServiceDetailsModal")

    }
    setEntityId(e.target.id.split("//")[1]);
    setIsModalOpen(true); 
    return;
  }
    return [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,SelectModal];
}
