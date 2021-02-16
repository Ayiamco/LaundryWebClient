export async function addCustomer (formData){
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    console.log(formData,authToken)
    let resp =await fetch("https://localhost:44322/api/customer/new",{
                    method:"POST",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    body: JSON.stringify({
                        "username":formData.username, 
                        "address":formData.address,
                        "phoneNumber":formData.phoneNumber,
                        "name":formData.name
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>{
                        console.log(e)
                        return {"statusCode":"500"}
                    })           
    return resp;
}


export async function updateCustomer (formData){
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    let resp =await fetch("https://localhost:44322/api/customer",{
                    method:"PATCH",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    body: JSON.stringify({
                        "username":formData.username, 
                        "address":formData.address,
                        "phoneNumber":formData.phoneNumber,
                        "name":formData.name,
                        "laundryId":formData.laundryId,
                        "id":formData.id,
                        "employeeId":formData.employeeId
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>{
                        console.log(e)
                        return {"statusCode":"500"}
                    })         
    return resp;

}

export async function getCustomers(page,searchParam){
    let url="https://localhost:44322/api/customer/?page=" + (page===null ? 1 : page);
    url=searchParam !== null ?  url+`&name=${searchParam}`: url + "&name=";
    const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    
    let resp =await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Authorization":token
            },
            mode:'cors',
        }).then(res=> {
            return res.json()
        }).catch( (e)=>{
            console.log(e)
            return {
                    "statusCode":"500"
                };
        })
    console.log(resp)
    return resp;
}

export async function deleteCustomer(id){
     const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
     const url = "https://localhost:44322/api/customer/"+ id
    
    let resp =await fetch(url,{
            method:"DELETE",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Authorization":token
            },
            mode:'cors',
            
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

export async function findCustomer(customerId){
    let url="https://localhost:44322/api/customer/" + customerId;
    console.log(url)
    const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    let resp =await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Authorization":token
            },
            mode:'cors',
        }).then(res=> {
            return res.json()
        }).catch( (e)=>{
            console.log(e)
            return {
                    "statusCode":"500"
                };
        })
    console.log(resp)
    return resp;
}