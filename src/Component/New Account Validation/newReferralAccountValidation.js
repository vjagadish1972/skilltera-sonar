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
import { useDispatch } from 'react-redux';
import { selectHomeItemSelection } from '../../Redux/Reducer/homeItemSelectionSlice';
import { useNavigate } from 'react-router-dom';
//chaged

export default function NewReferralAccountValidation() {
    const { id } = useParams();
    const { promiseInProgress } = usePromiseTracker();
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(5)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        trackPromise(
            axios.get(ApiConstants.NEW_ACCOUNT_VALIDATION + id).then((response) => {
                setMessage(response.data.message)
                dispatch(selectHomeItemSelection('refer'));
                document.documentElement.style.setProperty('--list-item-color', '#750887');
                document.documentElement.style.setProperty('--list-box-shadow', 'rgba(36, 109, 162, 0.2)');
            }).catch((error) => {
                setMessage(error.response.data.error)
                dispatch(selectHomeItemSelection('refer'));
                document.documentElement.style.setProperty('--list-item-color', '#750887');
                document.documentElement.style.setProperty('--list-box-shadow', 'rgba(36, 109, 162, 0.2)');
            })
        )
    }, [])

    useEffect(() => {
        timer > 0 ? setTimeout(() => {
            setTimer(timer - 1)
        }, 1000) : navigate('/refer')
    }, [timer])
    return (<>
        <NavBarNew />
        {promiseInProgress === true ? <Loading /> : <div className='verification mt-5 mb-5'>
            <span className='main-heading-account'>{message}</span>
            <span className='sub-heading-account'>You will be redirected to Skilltera Referral page after!</span>
            <span className='timer'>{timer}</span>
        </div>}
        <Footer />
    </>)
}