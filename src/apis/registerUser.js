async function registerUser (formData){
    await fetch("https://localhost:44322/api/laundry/register",{
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
                "laundryName":formData.laundryName
            })
        })
        .then(res=>(res.json()))
        .catch(e=>{
            return JSON.stringify(
                {
                    statusCode:500
                }
            )
        })

}

export default registerUser;