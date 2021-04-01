const baseUrl= process.env.REACT_APP_API_URL;
export async function getDashboardData (){
    const authToken= "Bearer " + localStorage.getItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22");
    let resp =await fetch(`${baseUrl}/home`,{
                    method:"GET",
                    headers:{
                        "Content-Type":'application/json; charset=utf-8',
                        Authorization:authToken
                    },
                    mode:'cors',
                    })
                    .then(res=>{
                        if(res.status===401) return res;
                        return  res.json()
                    })  
                    .catch(e=>{
                        console.log(e)
                        return {"statusCode":"500"}
                    })        
    return resp;
}