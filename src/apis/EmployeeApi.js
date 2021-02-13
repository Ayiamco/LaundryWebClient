export const addEmployee= async (email)=>{
    const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");

    let resp =await fetch("https://localhost:44322/api/employee/add",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Authorization":token
            },
            mode:'cors',
            body: JSON.stringify({
                username:email 
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

export const registerEmployee = async (formData)=>{
let resp =await fetch("https://localhost:44322/api/employee/new",{
                    method:"POST",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                    },
                    mode:'cors',
                    body: JSON.stringify({
                        "username":formData.username, 
                        "password":formData.password,
                        "confirmPassword":formData.confirmPassword,
                        "address":formData.address,
                        "phoneNumber":formData.phoneNumber,
                        "laundryId":formData.laundryId,
                        "name":formData.name
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>({"statusCode":"500"}))
           
    return resp;
}

export async function getEmployees(page,searchParam){
    let url="https://localhost:44322/api/employee/?page=" + (page===null ? 1 : page);
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

export async function findEmployee(employeeId){
    let url="https://localhost:44322/api/employee/" + employeeId;
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

export async function deleteEmployee(id){
     const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
     const url = "https://localhost:44322/api/employee/delete/"+ id
    
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

    return resp;
}