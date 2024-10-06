// import React from 'react'
// import "./givenReferal.css"

// import GivenSection from "./GivenSection/givenSection"


// const GivenRecomm = () => {

//     const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"));
//     const token = candidateData.token;
//     const userId = candidateData.candidate._id;
//     const referals = candidateData.candidate.referrals != undefined ?candidateData.candidate.referrals:[];
  

//     return (
//         <>
//            <div className="card mb-3" id="personalData">
//         <div className="card-body">

//         {referals.length > 0 ?
         
//          referals.map((x) => {    
              
//                return(  <GivenSection  key={x._id}  {...x}   />  )}) : " " } 

//            </div>
//            </div>  
//         </>
//     )
// }

// export default GivenRecomm
