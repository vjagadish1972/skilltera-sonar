import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./modal.css";

function Modal({ children, setModalClose }) {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setModalClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setModalClose();
        }
    };

    useEffect(() => {
        const previousFocus = document.activeElement; // Save the previously focused element
        if (modalRef.current) {
            modalRef.current.showModal(); // Open the dialog when the component mounts
            modalRef.current.focus(); // Shift focus to the modal
        }

        return () => {
            if (modalRef.current) {
                modalRef.current.close(); // Close the dialog when the component unmounts
            }
            if (previousFocus) {
                previousFocus.focus(); // Return focus to the previously focused element
            }
        };
    }, []);

    return (
        <dialog
            className="modalBackground"
            onClick={(e) => closeModal(e)}
            onKeyDown={handleKeyDown}
            ref={modalRef}
        >
            {children}
        </dialog>
    );
}

// Define PropTypes for the component
Modal.propTypes = {
    children: PropTypes.node.isRequired, // Validates the children prop
    setModalClose: PropTypes.func.isRequired, // Validates setModalClose as a required function
};

export default Modal;
