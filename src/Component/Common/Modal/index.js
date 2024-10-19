import React, { useRef } from "react";
import "./modal.css";

function Modal({ children, setModalClose }) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setModalClose();
        }
    };
    return (
        <div
            className="modalBackground"
            onClick={(e) => closeModal(e)}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
        >
            {children}
        </div>
    );
}

export default Modal;
