export async function addService (formData){
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    console.log(formData,authToken)
    let resp =await fetch("https://localhost:44322/api/service/new",{
                    method:"POST",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    body: JSON.stringify({
                        "name":formData.name, 
                        "price":formData.price,
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>{
                        console.log(e)
                        return {"statusCode":"500"}
                    })
    console.log("service new resp:",resp)           
    return resp;
}

export async function updateService(formData){
    console.log("form data in update service:",formData)
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    let resp =await fetch("https://localhost:44322/api/service",{
                    method:"PATCH",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    body: JSON.stringify({
                        "name":formData.name, 
                        "price":formData.price,
                        "id":formData.id,
                        "laundryId":formData.laundryId
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

export async function getServices(page,searchParam){
    let url="https://localhost:44322/api/service/?page=" + (page===null ? 1 : page);
    url=url+`&name=${searchParam? searchParam:""}`;
    console.log("get service url:",url)
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
    console.log("service resp:",resp.data)
    return resp;
}

export async function deleteService(id){
     const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
     const url = "https://localhost:44322/api/service/"+ id
    
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

export async function findService(serviceId){
    console.log("find service reached:",serviceId)
    let url="https://localhost:44322/api/service/" + serviceId;
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

export async function getAllServices(){
    let url="https://localhost:44322/api/service/all"
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
       
    return resp;
}