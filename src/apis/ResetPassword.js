 export const sendPassowordResetMail = async (email,role)=>{
    const url= "https://localhost:44322/api/account/forgotpassword" 
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
    let url="https://localhost:44322/api/account/forgotpassword/" + data.id
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