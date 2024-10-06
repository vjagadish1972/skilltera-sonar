import React, { useState, useRef, useEffect } from 'react';
import NavBarNew from "../../Component/NavBar New/navBarNew";
import ApiConstants from "../../Services/apiconstants";
import {useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const PolicyCheck = () => {
    let navigate = useNavigate();

    if (sessionStorage.getItem('candidate_data') != null) {
        const candidateDataMix = JSON.parse(sessionStorage.getItem("candidate_data"))
        var token = candidateDataMix.token;
        var userId = candidateDataMix.candidate._id;
      }
   

      const [isChecked, setIsChecked] = useState(false);
      const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
      const agreementContentRef = useRef(null);
    
      useEffect(() => {
        const handleScroll = () => {
          if (agreementContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = agreementContentRef.current;
            setIsScrolledToBottom(scrollTop + clientHeight === scrollHeight);
          }
        };
    
        if (agreementContentRef.current) {
          agreementContentRef.current.addEventListener('scroll', handleScroll);
        }
        
        return () => {
          if (agreementContentRef.current) {
            agreementContentRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);
    
      const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
      };

    const handleAgreeButtonClick = () => {
      if (isChecked) {
      
        axios.patch(ApiConstants.PROFILE,
          {
            "policyCheck": true
          },
          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              _id: userId,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            },
          }
        ).then((res) => {
            Swal.fire({
                title: "Agreement signed Successfully",
                icon: "success",
                width: 400,
                height: 100,
              })

            setTimeout(() => {
                navigate('/userProfile')
            },1000)
        }).catch((err) => {
            Swal.fire({
                title: "Something Wrong",
                icon: "error",
                width: 400,
                height: 100,
              })
        })
       
      } else {
        alert('Please agree to the terms before proceeding.');
      }
    };
  
    return (
           <>

       <NavBarNew/>
      <div className="container mt-1">
        <div className="card">
          <div className="card-header">
            <h5>Terms of Service Agreement</h5>
          </div>
          <div className="card-body" ref={agreementContentRef} style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <p>
             
              {Array.from({ length: 20 }).map((_, index) => (
                <React.Fragment key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae arcu eu dui efficitur cursus. 
                  Vestibulum sodales quam ut eros accumsan, vitae vehicula sem cursus. 
                  Duis vel eros a libero vestibulum fermentum. 
                  Sed faucibus est a turpis varius, a sagittis odio interdum. 
                  Aenean bibendum libero nec sapien pharetra faucibus. 
                  Donec fermentum mi at ante bibendum, vel ullamcorper turpis placerat. 
                  Nullam ut lectus consequat, mollis libero vel, aliquam leo. 
                  Donec auctor, enim vitae egestas luctus, purus dui hendrerit dui, sit amet ultrices eros ipsum nec velit. 
                  Vivamus in quam ac nulla aliquam blandit.
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="card-footer">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={!isScrolledToBottom}
              />
              <label className="form-check-label" htmlFor="agreeCheckbox">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary buttonSend "
              onClick={handleAgreeButtonClick}
              disabled={!isChecked || !isScrolledToBottom}
            >
              Agree
            </button>
            </div>
          </div>
        </div>
      </div>

      </>
    );
}

export default PolicyCheck