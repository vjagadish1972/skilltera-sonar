import React, { useState } from 'react'
import './referHome.css'
import ReferSectionOneImage from '../../../Assets/referSectionone.png'
import ReferSectionTwoImage from '../../../Assets/referSectiontwo.png'
import ReferSectionThreeImage from '../../../Assets/referSectionthree.png'
import ReferSectionFourImage from '../../../Assets/referSectionfour.png'
import LoginRefNew from '../../ReferalAny/LoginRefNew/loginRefNew'
import SignupRefNew from '../../ReferalAny/SignupRefNew/signupRefNew'

export default function ReferHome() {
    const [referButtonSelection, setReferButtonSelection] = useState('login')
    const buttonSelection = (sel) => {
        setReferButtonSelection(sel)
    }
    return (
        <>
            <div className='refer-section-one'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 refer-section-first-half'>
                            <div className='refer-section-left'>
                                <div className='refer-main-text'>
                                    <p className='refer-main-heading'><span style={{ color: 'var(--list-item-color)' }}>Refer Candidate</span> <br />And Earn <span style={{ color: 'var(--list-item-color)' }}>Rewards</span></p>
                                    <p className='refer-main-subheading'><span style={{ color: 'var(--list-item-color)' }}>Skilltera’s</span> Referral Program that rewards Approved Referrers <br /> generously for referring experienced candidates.</p>
                                </div>
                                <div className='refer-section-one-banner'>
                                    <img className='img-fluid' src={ReferSectionOneImage} alt=" "></img>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='refer-login-signup-button'>
                                <div className="refer-group-btn" role="group" aria-label="Basic example">
                                    <button type="button" className={referButtonSelection == 'login' ? "active-refer-btn" : "refer-btn"} onClick={() => { buttonSelection('login') }}>Login</button>
                                    <button type="button" className={referButtonSelection == 'signup' ? "active-refer-btn" : "refer-btn"} onClick={() => { buttonSelection('signup') }}>Signup</button>
                                </div>
                            </div>
                            <div className='refer-login-section'>
                                {(() => {
                                    switch (referButtonSelection) {
                                        case "login":
                                            return <LoginRefNew />;
                                            break;
                                        case "signup":
                                            return <SignupRefNew />;
                                            break;
                                        default:
                                            return <LoginRefNew />;
                                    }
                                })()}
                            </div>
                            <div className='refer-points'>
                                <ul>
                                    <li>Register as a referrer and get approved before referring candidates.</li>
                                    <li>Share your LinkedIn URL<br />
                                        Detailed profile<br />
                                        Government Issued ID</li>
                                    <li>Refer any number of candidates</li>
                                    <li>Strong experienced candidates shine and get noticed by Employers</li>
                                    <li>As a referrer, you can earn up to<span style={{ color: 'var(--list-item-color)', fontWeight: '700' }}> $1000</span> per successful full-time candidate through <span style={{ color: 'var(--list-item-color)', fontWeight: '700' }}>Skilltera Referral Program</span></li>
                                    <li>Reward will be directly credited to your bank or paypal account.</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className='refer-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 refer-text-section-globally'>
                            <div className='refer-text-section'>
                                <p className='refer-section-heading'>Register as a referrer and get approved before referring candidates. </p>
                                <p className='refer-section-subheading'>Register and verify your government ID<br />
                                    Share your LinkedIn URL<br />
                                    Detailed profile
                                </p>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='refer-section-banner'>
                                <img className='img-fluid' src={ReferSectionTwoImage} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='refer-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1'>
                            <div className='refer-section-banner'>
                                <img className='img-fluid' src={ReferSectionThreeImage} alt=""></img>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 refer-text-section-globally'>
                            <div className='refer-text-section'>
                                <p className='refer-section-heading'>Refer any number of <br /> candidates</p>
                                <p className='refer-section-subheading'>Strong experienced candidates shine <br /> and get noticed by Employers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='refer-section-globally'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-6 refer-text-section-globally'>
                            <div className='refer-text-section'>
                                <p className='refer-section-heading'>As a referrer, you can earn up to <span style={{ color: '#750887' }}> $1000</span> per successful full-time candidate through
                                    <span style={{ color: '#750887' }}> <br />Skilltera Referral Program</span> </p>
                                <p className='candidate-section-subheading'>Reward will be directly credited to your<br /> bank or paypal account.
                                </p>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='candidate-section-banner'>
                                <img className='img-fluid' src={ReferSectionFourImage} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}