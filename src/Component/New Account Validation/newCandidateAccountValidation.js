import axios from 'axios';
import react from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { BsFileBreakFill } from 'react-icons/bs';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { useParams } from 'react-router-dom';
import ApiConstants from '../../Services/apiconstants';
import Footer from '../Footer/footer';
import Loading from '../Loading/loading';
import './newAccountValidation.css'
import { Interceptor } from '../../ErrorStatus/errorStatus';
import NavBarNew from '../NavBar New/navBarNew';

export default function NewCandidateAccountValidation() {
    const { id } = useParams();
    const { promiseInProgress } = usePromiseTracker();
    const [message, setMessage] = useState('');
    const [verify, setVerify] = useState('');
    const [timer, setTimer] = useState(5)


    useEffect(() => {
        trackPromise(
            axios.get(ApiConstants.NEW_ACCOUNT_VALIDATION + id).then((response) => {
                setMessage(response.data.message)
                setVerify('Login')
            }).catch((error) => {

                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {

                    Interceptor(error.response.status)
                }
                else {

                    setMessage(error.response.data.error)
                    setVerify('Signup')
                }
            })
        )
    }, [])


    useEffect(() => {
        timer > 0 ? setTimeout(() => {
            setTimer(timer - 1)
        }, 1000) : window.location.href = (verify == 'Login' ? '/' : '/')
    }, [timer])



    return (<>
        <NavBarNew />
        {promiseInProgress === true ? <Loading /> : <div className='verification mt-5 mb-5'>
            <span className='main-heading-account'>{message}</span>
            <span className='sub-heading-account'>You will be redirected to Skilltera {verify} page after!</span>
            <span className='timer'>{timer}</span>
        </div>}

    </>)
}