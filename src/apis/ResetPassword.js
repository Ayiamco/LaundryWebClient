const baseUrl=process.env.REACT_APP_API_URL; 
 export const sendPassowordResetMail = async (email,role)=>{
    const url= baseUrl+"/account/forgotpassword" 
    let resp=await fetch(url,{
                        method:"POST",
                        headers:{
                                "Content-Type":'application/json; charset=utf-8',
                            },
                        mode:'cors',
                        body: JSON.stringify({
                        username:email,  
                        role:role              
                        })
                    })
                    .then(resp=> (resp.json()))
                    .catch( e=> ({"statusCode":"500"}));
    return resp;
}

export const saveNewPassword = async  (data) =>{
    let url=baseUrl+"/account/forgotpassword/" + data.id
    console.log(data)
    let resp = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json; charset=utf-8',
                    },
                mode:'cors',
                body: JSON.stringify({
                    password:data.password, 
                    confirmPassword:data.confirmPassword               
                })})
                .then(resp=> (resp.json()))
                .catch(e=> ({"statusCode":"500"}) )           
    return resp;
}