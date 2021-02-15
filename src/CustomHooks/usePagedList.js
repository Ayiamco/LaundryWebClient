import {useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import useQuery from "./useQuery";
import {getEmployees} from "../apis/EmployeeApi";
import {getCustomers} from "../apis/CustomerApi";


const Apis={
    "employee": getEmployees,
    "customer": getCustomers,
}
export default function usePagedList(entity) {
    const [itemList, setitemList] = useState([])
    const [page, setPage] = useState(useQuery().get("page"));
    const [searchParam,setSearchParam]=useState(useQuery().get("name"))
    const [inputValue,setInputValue]=useState("")
    const [maxPageIndex, setMaxPageIndex] = useState(1);
    const history=useHistory();

    function handleInput(e){
       setInputValue(e.target.value)
       setSearchParam(e.target.value)
    }

   function handleForm(e){
        e.preventDefault()
   }
    

     useEffect(() => {
        const getData = 
        async () => {
            const getItems= Apis[entity]
            console.log("search param:",searchParam)
            let resp = await getItems(page,searchParam);
            if (resp.statusCode === "200") {
                console.log(resp.data.data.length)
                setitemList(resp.data.data);
                setMaxPageIndex(resp.data.maxPageIndex);
                setPage(resp.data.pageIndex);

                searchParam ? history.push(`/${entity}s?page=${resp.data.pageIndex}&name=${searchParam}`)    
                                : history.push(`/${entity}s?page=${resp.data.pageIndex}`);
        
            }
        };
        getData();
    }, [page,searchParam]);
    return [itemList,page,inputValue,maxPageIndex,searchParam,handleInput,handleForm,setPage]
    
}
