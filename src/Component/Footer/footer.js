import React from 'react'
import './footer.css'
import Logo from '../../Assets/skilltera_logo1.png'
import { NavLink } from 'react-router-dom';
export default function Footer() {
    return (
            <footer style={{ 'overflowX': 'hidden' }}>

                <div className='footer-body'>
                    <div className='container'>
                        <div className='footer-content'>
                            <div className='row'>
                                <div className='col-md-4 col-lg-4 order-2 order-md-1 order-lg-1'>
                                    <div className='row'>
                                        <div className='col-12 image-padding'>
                                            <img src={Logo} className="img-fluid" alt="logo"/>
                                        </div>
                                        <div className='col-12'>
                                            <div className='social-icons'>
                                                <div className='row'>
                                                    <div className='col-auto col-md-auto col-lg-auto decoration'>
                                                        <p>Follow Us</p>
                                                    </div>
                                                    <div className='col-1 col-md-auto col-lg-auto'>
                                                        <i className="fa fa-github" style={{ 'color': '#000000' }} aria-hidden="true"></i>
                                                    </div>
                                                    <div className='col-1 col-md-auto col-lg-auto'>
                                                        <i className="fa fa-facebook" style={{ 'color': '#000000' }} aria-hidden="true"></i>
                                                    </div>

                                                    <div className='col-1 col-md-auto col-lg-auto'>
                                                        <i className="fa fa-instagram" style={{ 'color': '#000000' }} aria-hidden="true"></i>
                                                    </div>
                                                    <div className='col-1 col-md-auto col-lg-auto'>
                                                        <i className="fa fa-linkedin" style={{ 'color': '#000000' }} aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='col-md-8 col-lg-8 order-1 order-md-2 order-lg-2'>
                                    <div className='row'>
                                        {/* <div className='col-12 col-md-auto col-lg-1 decoration'>
                                            <NavLink to='/'>  <p className='decoration'>Home</p></NavLink>
                                        </div> */}
                                        <div className='col-12 col-md-auto col-lg-auto decoration'>
                                            <NavLink to='/about'>  <p className='decoration'>About Us</p></NavLink>
                                        </div>
                                        <div className='col-12 col-md-auto col-lg-auto decoration'>
                                            <NavLink to='/contact'>   <p className='decoration'>Contact Us</p></NavLink>
                                        </div>
                                        <div className='col-12 col-md-auto col-lg-auto decoration'>
                                            <p className='decoration'>Help &amp; Support</p>
                                        </div>
                                        <div className='col-12 col-md-auto col-lg-auto decoration spacing-text'>
                                            <p className='decoration'>Privacy Policy</p>
                                        </div>
                                        <div className='col-12 col-md-2 col-lg-2 decoration spacing-text'>
                                            <p className='decoration'>Accessibility</p>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    );
}