import React, { useEffect, useState, useRef } from "react";
import "./style.css";
//Assets
import { MdPerson } from "react-icons/md";
//context

const options = ["Logout"];
export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const clickRef = useRef();
    const toggling = () => {
        setIsOpen(!isOpen);
    };

    const onOptionClicked = (value) => {
        if (value === "Logout") {
            window.location.pathname = "/";
            localStorage.clear();
            sessionStorage.clear();
        }
        setIsOpen(false);
    };

    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isOpen]);
    return (
        <div className="userdropdowncontainer" ref={clickRef}>
            <div onClick={toggling}>
                <MdPerson />
            </div>{" "}
            {isOpen && (
                <ul>
                    {options.map((option, i) => (
                        <li onClick={() => onOptionClicked(option)} key={i}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
