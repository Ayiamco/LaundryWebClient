const  loginUser = async (username,password)=>{

    let resp =await fetch("https://localhost:44322/api/account/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
            },
            mode:'cors',
            body: JSON.stringify({
                "username":username,
                "password":password,
                
            })
        }).then(res=> {
            return res.json()
        }).catch( (e)=>{
            return JSON.stringify({
                    statusCode:500,
                });
        })

    return resp;
}

export default loginUser;