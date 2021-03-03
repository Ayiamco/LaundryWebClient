const baseUrl=process.env.REACT_APP_API_URL;
const  loginUser = async (formData)=>{

    let resp =await fetch(baseUrl+"/account/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                "Access-Control-Allow-Origin": "*"
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