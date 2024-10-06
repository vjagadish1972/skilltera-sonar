import React from 'react'
import Footer from "../../Component/Footer/footer"
import pagenotfound from "../../Assets/pagenotfound.png"
import "./notFoundPage.css"
import NavBarNew from '../../Component/NavBar New/navBarNew'


export default function NotFoundPage() {
    return (
        <>
            <NavBarNew />
            <div className="d-flex justify-content-center pageNotfound">
                <img src={pagenotfound} alt="pagenotfound" className='img-fluid' />
            </div>
            <Footer />
        </>
    )
}

