import {useState} from 'react'

export default function useModals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityId,setEntityId]=useState("");
  const [entityName,setEntityName]=useState("");
  const [modalType,setModalType]=useState("")
  

  
  async function handleModals(e) {
    let id = e.target.id.split("//")[1];
    setEntityName(e.target.name.split("//")[1])
    if (e.target.name.includes("delete-employee")) {
        console.log("del clicked")
      setModalType("DeleteConfirmationModal")
    } 
    else if(e.target.name.includes("employee-detail")){ 
      setModalType("EmployeeDetailsModal")
    }
    console.log(id)
    setEntityId(id);
    setIsModalOpen(true); 
  }
    return [isModalOpen ,setIsModalOpen,entityId,modalType, entityName,handleModals];
}
