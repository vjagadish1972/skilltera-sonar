import Swal from "sweetalert2"
export const Interceptor = (status) => {
    switch (status) {
        case status >= 404 && status <= 499:
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops ! Something went wrong',
                    html: 'Sorry about this. Please try after some time or report the error by sending an email to ' + '<a href="//service@skilltera.info"> service@skilltera.info</a>'
                })
            )
        case status >= 500 && status <= 599:
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops ! Something went wrong',
                    html: 'Sorry about this. Please try after some time or report the error by sending an email to ' + '<a href="//service@skilltera.info"> service@skilltera.info</a>'
                })
            )
        default:
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops ! Something went wrong',
                    html: 'Sorry about this. Please try after some time or report the error by sending an email to ' + '<a href="//service@skilltera.info"> service@skilltera.info</a>'
                })
            )
    }
}