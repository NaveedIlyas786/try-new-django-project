import React from 'react'
import "./decision.css";

const RejectionPage = () => {
    return (
    <div className='rejectPage' >
        <img src="../../../src/assets/sad.gif" style={{width:"150px",height:"150px"}} alt="" />
        <h1 style={{color:"red"}}>You are not Approved From Admin Side</h1>
    </div>
    )
}

export default RejectionPage