const baseUrl= process.env.REACT_APP_API_URL;
export async function getDashboardData (formData){
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    let resp =await fetch("https://localhost:44322/dashboard",{
                    method:"GET",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    })
                    .then(res=>{
                        return  res.json()
                    })  
                    .catch(e=>{
                        return {"statusCode":"500"}
                    })  
    console.log(resp);         
    return resp;
}