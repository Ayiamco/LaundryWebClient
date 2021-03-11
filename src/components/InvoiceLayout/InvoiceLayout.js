import React,{useState} from "react";
import {toTitleCase} from "../../Utilities/helper";
import "../../Utilities/utilities.css"
import usePagedList from "../../CustomHooks/usePagedList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Modal from "react-modal";
import InvoiceDetailsModal from "../AppModals/Components/InvoiceDetailsModal"
import {getInvoice} from "../../apis/InvoiceApi";

export default function InvoiceLayout() {
  const [itemList,page,inputValue,maxPageIndex,searchParam,isLoading,
    handleInput,handleForm,setPage,isNetworkError]= usePagedList("invoice");
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [modalData,setModalData]=useState("")
  
  async function handleModal(e){
    let invoiceId= e.target.id.split("//")[1]
    let invoiceInfo= await getInvoice(invoiceId);
    console.log(invoiceInfo)
    setIsModalOpen(true)
    setModalData(invoiceInfo);
  }
  return (
    <div className="ECSL-con">
      
     <Modal isOpen={isModalOpen} shouldCloseOnOverlayClick={false} className="AIM-modal"
        overlayClassName="AIM-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        children={<InvoiceDetailsModal modalData={modalData} setIsModalOpen={setIsModalOpen}/>}
    />
      
      {
        isLoading ? <LoadingSpinner isNetworkError={isNetworkError}></LoadingSpinner> :
        <div>
          <div className="ECSL-con-header">
             <h2>Invoice List</h2>
            <form onSubmit={handleForm}>
              <input placeholder="Enter customer name" onChange={handleInput} value={inputValue}></input>
              <button className="ECSL-con-header-btn ECSL-btn">Search</button>
            </form>
            </div>
            <p style={{ display: itemList.length ? "none" : "block" }}>
              {searchParam ?  "No Customer matches your search":"You are yet to add invoices to your laundry" }
            </p>
            <div style={{ display: itemList.length ? "block" : "none" }} >
          </div>
          
          
          <div className="ECSL-table-con">
              <table className="ECSL-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Customer Name</th>
                <th>Invoice Amount</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((invoice) => {
                return (
                  <tr key={invoice.id}>
                    <td>
                      <button  className="ECSL-btn-detail" name={`invoice-details//${invoice.name}`} onClick={handleModal} 
                        id={"id//"+ invoice.id} children={toTitleCase(invoice.id)}
                      />
                    </td>
                    <td>{invoice.customer.name}</td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.amountPaid}</td>
                    <td>{invoice.isCollected ? "Collected": "Not collected"}</td>
                    <td>{new Date(invoice.createdAt.slice(0,10)).toDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          <div className="ECSL-btn-pagination">
            <button
              style={{ display: parseInt(page) === 1 ? "none" : "block" }} className="ECSL-btn"
              onClick={() => {setPage((prev) => parseInt(prev) - 1);}} >
              Prev
            </button>
            <button
              style={{
                display: parseInt(page) === maxPageIndex ? "none" : "block",
              }}
              className="ECSL-btn"
              onClick={() => {
                setPage((prev) => parseInt(prev) + 1);
              }}
            >
              {" "}
              Next
            </button>
          </div>
          <p className="ECSL-ft">
          Showing page {page} of {maxPageIndex}
        </p>
        
       </div>
    
     

      }
    
    </div>
  );
}
