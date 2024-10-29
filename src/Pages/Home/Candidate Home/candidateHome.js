import React, { useState } from 'react'
import './candidateHome.css'
import CandidateSectionOneImage from '../../../Assets/candidateSectionOne.png'
import CandidateSectionTwoImage from '../../../Assets/candidateSectiontwo.png'
import CandidateSectionThreeImage from '../../../Assets/candidateSectionthree.png'
import CandidateSectionFourImage from '../../../Assets/candidateSectionfour.png'
import CandidateSectionFiveImage from '../../../Assets/candidateSectionfive.png'
import CandidateLogin from '../../Login/Candidate Login/candidateLogin'
import CandidateSignup from '../../Signup/Candidate Signup New/candidateSignupNew'
import { useDispatch } from 'react-redux'
import { selectHomeItemSelection } from '../../../Redux/Reducer/homeItemSelectionSlice'

export default function CandidateHome() {
    //Bug resolved
    const [candidateButtonSelection, setCandidateButtonSelection] = useState('login')
    const dispatch = useDispatch()
    const buttonSelection = (sel) => {
        setCandidateButtonSelection(sel)
    }
    const referPage = () => {
        dispatch(selectHomeItemSelection('refer'));
        document.documentElement.style.setProperty('--list-item-color', '#750887');
        document.documentElement.style.setProperty('--list-box-shadow', 'rgba(36, 109, 162, 0.2)');
    }
    return (
        <>
            <div className='candidate-section-one'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 candidate-section-first-half'>
                            <div className='candidate-section-left'>
                                <div className='candidate-section-one-banner'>
                                    <img className='img-fluid' src={CandidateSectionOneImage} alt=""></img>
                                </div>
                                <div className='candidate-section-rise-and-shine'>
                                    <span className='rise-and-shine'>Rise and Shine</span>
                                    <p className='make-it-easy'>We Make it<span className='candidate-section-rise-and-shine-easy'> Easy</span></p>
                                    <p className='make-our-profile'>Make your Profile and stand out to get <br /> your dream job! </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='candidate-login-signup-button'>
                                <div className="candidate-group-btn" role="group" aria-label="Basic example">
                                    <button type="button" className={candidateButtonSelection == 'login' ? "active-candidate-btn" : "candidate-btn"} onClick={() => { buttonSelection('login') }}>Login</button>
                                    <button type="button" className={candidateButtonSelection == 'signup' ? "active-candidate-btn" : "candidate-btn"} onClick={() => { buttonSelection('signup') }}>Signup</button>
                                </div>
                            </div>
                            <div className='candidate-login-section'>
                                {(() => {
                                    switch (candidateButtonSelection) {
                                        case "login":
                                            return <CandidateLogin />;
                                            
                                        case "signup":
                                            return <CandidateSignup />;
                                            break;
                                        default:
                                            return <CandidateLogin />;
                                    }
                                })()}
                            </div>
                            <div className='candidate-refer-section-one'>
                                <p className='candidate-refer'>Refer a candidate and<br /> earn upto <span className='dollar'> 500$</span></p>
                                <div className='candidate-refer-button'>
                                    <button type='button' className='candidate-know-more' onClick={referPage}>Know More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='candidate-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1'>
                            <div className='candidate-section-banner'>
                                <img className='img-fluid' src={CandidateSectionTwoImage} alt=""></img>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 candidate-text-section-globally'>
                            <div className='candidate-text-section'>
                                <p className='candidate-section-heading'>Create Profile</p>
                                <p className='candidate-section-subheading'>Create your profile, mention your experience.
                                    <br />Make your profile standout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='candidate-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 candidate-text-section-globally'>
                            <div className='candidate-text-section'>
                                <p className='candidate-section-heading'>Rate Your Skill </p>
                                <p className='candidate-section-subheading'>Rate your technical skills with rating stars
                                    <br />between 1 to 5.
                                </p>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='candidate-section-banner'>
                                <img className='img-fluid' src={CandidateSectionThreeImage} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='candidate-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1'>
                            <div className='candidate-section-banner'>
                                <img className='img-fluid' src={CandidateSectionFourImage} alt=""></img>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 candidate-text-section-globally'>
                            <div className='candidate-text-section'>
                                <p className='candidate-section-heading'>Rise and Shine with<br /> Recommendations</p>
                                <p className='candidate-section-subheading'>Get recommendation with experience<br />
                                    employee, who can rate your skills and help <br />you stand out.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='candidate-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 candidate-text-section-globally'>
                            <div className='candidate-text-section'>
                                <p className='candidate-section-heading'>Refer candidate <br /> and earn rewards </p>
                                <p className='candidate-section-subheading'>Refer candidates and earn rewards on every <br />successful selection.</p>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='candidate-section-banner'>
                                <img className='img-fluid' src={CandidateSectionFiveImage} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}