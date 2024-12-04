import Swal from "sweetalert2";

export const Interceptor = (status) => {
    let message = "Sorry about this. Please try after some time or report the error by sending an email to ";
    let emailLink = '<a href="//service@skilltera.info">service@skilltera.info</a>';

    if ((status >= 404 && status <= 499) || (status >= 500 && status <= 599)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops! Something went wrong',
            html: `${message} ${emailLink}`,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            html: `${message} ${emailLink}`,
        });
    }
};
