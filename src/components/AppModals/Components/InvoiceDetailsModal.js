import React from 'react';

export default function InvoiceDetailsModal({modalData, setIsModalOpen}) {
    return (
        <div>
            <i className="fas fa-times" onClick={()=>{setIsModalOpen(false)}}>
            </i>
            <h4 className="center">Invoice Details</h4>
            <table className="table" style={{marginTop:"1em"}}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        modalData.invoiceItems.map((item,index)=>{
                            return (
                                    <TableRow index={index}serviceName={item.service.name}
                                    quantity={item.quantity} price={item.service.price} 
                                    />
                            )
                        })

                    }
                </tbody>
            </table>
            
            <p>Invoice Total:&#8358;{modalData.amount}</p>
            <p>Amount Paid: &#8358;{modalData.amountPaid}</p>
            <p>Balance: &#8358;{modalData.amount - modalData.amountPaid}</p>
        </div>
    )
}

function TableRow ({serviceName,price,quantity,index}){

    return (
        <tr>
            <th scope="col">{index + 1}</th>
            <td> {serviceName}</td>
            <td> &#8358;{price}</td>
            <td>{quantity}</td>
            <td> &#8358;{price * quantity}</td>
        </tr>
    )
}