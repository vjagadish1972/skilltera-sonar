import React from 'react'
import Footer from "../../Component/Footer/footer"
import NavBarNew from '../../Component/NavBar New/navBarNew'


const ErrorPage = () => {

    return (
        <>
            <NavBarNew />
            <div className="d-flex justify-content-center pageNotfound">
                <h1>404  page </h1>
            </div>
            <Footer />
        </>
    )

}

export default ErrorPage
