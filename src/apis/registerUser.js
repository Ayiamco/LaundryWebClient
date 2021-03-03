const baseUrl= process.env.REACT_APP_API_URL
async function registerUser (formData){
    let resp= await fetch(baseUrl+"/laundry/new",{
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
                        "laundryName":formData.laundryName,
                        "name":formData.name
                    })})
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>({"statusCode":"500"}))
    return resp;

}

export default registerUser;