const baseUrl= process.env.REACT_APP_API_URL;
export const addInvoice= async (invoiceData)=>{
    const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");

    let resp =await fetch(baseUrl+"/invoice/add",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Authorization":token
            },
            mode:'cors',
            body: JSON.stringify({
                customerId:invoiceData.customerId,
                 invoiceItems:invoiceData.invoiceItems,
                 remark:invoiceData.remark,
                 amountPaid:invoiceData.amountPaid
            })
        }).then(res=> {
            return res.json()
        }).catch( (e)=>{
            return {
                    "statusCode":"500"
                };
        })
     console.log(resp)
    return resp;
}