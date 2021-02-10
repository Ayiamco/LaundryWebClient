import React,{useRef} from 'react';
import "./PopUp.css";
export default function PopUp({message,display,shouldPopUpDisplay}) {
    const popUpRef=useRef();
    function closePopUp(){
        popUpRef.current.className= `PU-con PU-hide PU-${display}`;
    }
   
    return (
         <div className={shouldPopUpDisplay ? `PU-con PU-show PU-${display}` : `PU-con PU-hide PU-${display}` }  
            ref={popUpRef} >
                <i className="fas fa-times" onClick={closePopUp}></i>
                <p>{message}</p>
        </div>
    )
}
