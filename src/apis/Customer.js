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
    console.log(resp)           
    return resp;

}