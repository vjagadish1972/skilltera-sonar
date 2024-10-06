import react from 'react'
import Footer from '../../../Component/Footer/footer';
import NavBarNew from '../../../Component/NavBar New/navBarNew';
import './referralInfo.css'
export default function ReferralInfo() {
    return (
        <>
            <NavBarNew />
            <div className='container'>
                <div className='main-referral-section'>
                    <div className='refer-candidate-section'>
                        <span>Refer Candidates</span>
                    </div>
                    <div className='skilltera-referral-program'>
                        <span>
                            Skilltera’s Referral Program that rewards Referrers generously for referring experienced
                            candidates.
                        </span>
                    </div>
                    <div className='info-list-referral-candidate'>
                        <ul>
                            <li>Skilltera platform helps strong experienced candidates shine and get noticed by Employers</li>
                            <li>As a referrer, you can <b>earn up to $1000</b> per successful full-time candidate through <b>Skilltera Referral Program</b></li>
                            <li>Reward will be credited to your account once the candidate gets selected by employer we have partnered with and the candidate completes 3 months of employment with the employer</li>
                            <li>You can refer any number of candidates</li>
                            <li>In order to ensure that you get maximum success, please ensure that you refer only those candidates who you know are strong candidates with experience and expertise in skills that are in demand</li>
                            <li>We also recommend that you speak to your candidates once you refer them on Skilltera</li>
                            <li>Once you register online, please write to us <span style={{ color: 'blue', textDecoration: 'underline' }}>service@skilltera.info</span> and share your LinkedIn URL, detailed profile and a government issued ID to get officially enrolled for the rewards program.</li>
                            <li>Any reward will be directly credited to your bank or paypal account. No cash rewards will be offered</li>
                            <li>Your referral and related reward will be valid for 6 months from the day you refer the candidate</li>
                        </ul>
                    </div>
                    <div className='faq-referral-program'>
                        <span>FAQs about Skillera Referral Program</span>
                    </div>
                    <div className='faq-list'>
                        <ul>
                            <li>
                                <div><b>How can Skilltera reward up to $1000 when Skilltera is just a startup?</b></div>
                                <div>Skilltera will be giving the reward from the revenues we make when a company hires a candidate referred by you</div>
                            </li><br />
                            <li>
                                <div><b>Why will the reward be given after 3 months of candidate’s successful employment with the employer?</b></div>
                                <div>We want candidates to show their seriousness while accepting the offer from the company. Companies also mandate 3 months as minimum term before giving us the fee. Hence. we are keeping the condition of 3 months of employment with the employer for the referral reward.</div>
                            </li><br />
                            <li>
                                <div><b>Why does Skilltera want referrer to officially be approved? Why does Skilltera want a scanned copy of government ID to officially enroll a referrer? </b></div>
                                <div>Skilltera wants to ensure that referrer is a genuine verifiable person. We also want to verify whether referrer is qualified enough to refer quality candidates hence we are requesting for LinkedIn URL and a profile or resume’ of the referrer. These details, at the bare minimum, will help us ensure that referrer quality is maintained. </div>
                            </li><br />
                            <li>
                                <div><b>Why does Skilltera want referrer to speak to candidate after referring the candidate? </b></div>
                                <div>Skilltera wants to ensure that referrer knows the candidate and that the candidate agrees with the referral process. Skilltera also wants to ensure that referrer is doing due diligence while referring the candidates. This will ensure that right candidates are referred and it also increases the chances of referrer getting rewarded through Skilltera Referral Program</div>
                            </li><br />
                            <li>
                                <div><b>Who can become a referrer? Does it have to be from recruitment background or  can it be anyone?</b></div>
                                <div>Some of the examples of who can be a referrer who can look at Skilltera as a platform to earn through the Referral Rewards program: </div>
                                <div>
                                    <ul>
                                        <li>an ex-recruiting employee/agent who knows quality experienced candidates</li>
                                        <li>an ex-employee who knows some of the earlier colleagues or friends who are exploring options</li>
                                        <li>a current recruiting agent who knows skilled candidates based on their previous association</li>
                                        <li>A colleague, client, contractor, manager etc. of candidates that can be referred</li>
                                        <li>someone who is experienced but is currently available to do a part time stint and knows skilled candidates based on previous experience or association, etc.</li>
                                        <li>A trainer who has trained experienced candidates and knows some skilled candidates who can be referred</li>
                                    </ul>
                                </div>
                            </li><br />
                            <li>
                                <div><b>By any chance, would the referral program conflict with candidate’s current employer or client’s interest?</b></div>
                                <div>Skilltera believes that employees can work at will, which is legally allowed, and organizations are free to recruit the talent they feel is right for their needs. Based on this, we feel and believe that referral program will ensure that referrers, candidates and clients get benefited. </div>
                            </li><br />
                            <li>
                                <div><b>Can I refer candidates who are freshers? </b></div>
                                <div>Skilltera wants to focus on experienced candidates who are good in at least a few skills based on their experience, who are able to get a few recommendations and have a good number of projects to showcase. </div>
                            </li><br />
                            <li>
                                <div><b>Why does Skilltera referral and related reward valid for only for 6 months </b></div>
                                <div>Skilltera wants that outcome is successful for our clients and for referrals. We believe 6 months gives enough time for companies to check candidates and hire them. In order to ensure that only right candidates are referred we have given 6 months of time to referrers to take the benefits of rewards program. We also believe this is a good amount of time to allow candidates to standout for potential employers to recruit them to make the overall Rewards Program successful. </div>
                            </li><br />
                            <li>
                                <div><b>Will Skilltera referral and related reward validity be increased beyond 6 months  </b></div>
                                <div>Skilltera wants our referrers, clients and candidates to be successful. We will look at data and outcomes and decide, on need basis, if the time needs to be extended beyond 6 months. </div>
                            </li><br />
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}