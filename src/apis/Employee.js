export const addEmployee= async (email)=>{
    const token= "Bearer " +localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    console.log(token)
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
                        "laundryId":formData.laundryName,
                        "name":formData.name
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>({"statusCode":"500"}))

    return resp;
}