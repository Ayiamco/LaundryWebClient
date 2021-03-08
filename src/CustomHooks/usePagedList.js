import {useState,useEffect,useCallback} from 'react';
import {useHistory} from "react-router-dom";
import useQuery from "./useQuery";
import {getEmployees} from "../apis/EmployeeApi";
import {getCustomers} from "../apis/CustomerApi";
import { getServices } from '../apis/ServiceApi';
import { getInvoices } from '../apis/InvoiceApi';


const Apis={
    "employee": getEmployees,
    "customer": getCustomers,   
    "service":getServices,
    "invoice":getInvoices,
    
}
export default function usePagedList(entity) {
    const [itemList, setitemList] = useState([])
    const [page, setPage] = useState(useQuery().get("page"));
    const [searchParam,setSearchParam]=useState(useQuery().get("name"))
    const [inputValue,setInputValue]=useState("")
    const [maxPageIndex, setMaxPageIndex] = useState(1);
    const [isLoading,setIsLoading]=useState(true);
    const [isNetworkError,setIsNetworkError]=useState(false);
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
            
            if (resp.statusCode === "200" ) {
                setitemList(resp.data.data);
                setTimeout(setIsLoading(false), 2000);
                setMaxPageIndex(resp.data.maxPageIndex);
                setPage(resp.data.pageIndex);
                searchParam ? history.push(`/${entity}s?page=${resp.data.pageIndex}&name=${searchParam}`)    
                                : history.push(`/${entity}s?page=${resp.data.pageIndex}`);
        
            }
            else{
                setIsNetworkError(true);
            }
        },[searchParam,entity,history,page,]
   )
       
    useEffect(() => {getData()},[getData])  
    return [itemList,page,inputValue,maxPageIndex,searchParam,isLoading,handleInput,handleForm,setPage,isNetworkError]
    
}
