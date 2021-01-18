import React from 'react'

export default function FormBtn({text,isRequestSent,shouldButtonDisable}) {
    return (
        <div className="FB-con">
            <button id={isRequestSent?"btn-waiting":""} disabled={shouldButtonDisable} >
                {text}
            </button>
        </div>
    )
}
