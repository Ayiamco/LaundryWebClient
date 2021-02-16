import {useState,useEffect,useCallback} from 'react';
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
    const [isLoading,setIsLoading]=useState(true);
    const history=useHistory();

    function handleInput(e){
       setInputValue(e.target.value)
       setSearchParam(e.target.value)
    }

   function handleForm(e){
        e.preventDefault()
   }

   const getData = useCallback(
        async () => { 
            const getItems= Apis[entity]
            let resp = await getItems(page,searchParam);
            setTimeout(setIsLoading(false),5000)
            
            if (resp.statusCode === "200") {
                setitemList(resp.data.data);
                setMaxPageIndex(resp.data.maxPageIndex);
                setPage(resp.data.pageIndex);

                searchParam ? history.push(`/${entity}s?page=${resp.data.pageIndex}&name=${searchParam}`)    
                                : history.push(`/${entity}s?page=${resp.data.pageIndex}`);
        
            }
        },[searchParam,entity,history,page]
   )
       
     useEffect(() => {getData()},[getData])
        
    return [itemList,page,inputValue,maxPageIndex,searchParam,isLoading,handleInput,handleForm,setPage]
    
}
