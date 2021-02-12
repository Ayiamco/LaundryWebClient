const  loginUser = async (formData)=>{

    let resp =await fetch("https://localhost:44322/api/account/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
            },
            mode:'cors',
            body: JSON.stringify({
                "username":formData.username,
                "password":formData.password,
                "role": formData.role ===undefined ? null : formData.role
                
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

export default loginUser;