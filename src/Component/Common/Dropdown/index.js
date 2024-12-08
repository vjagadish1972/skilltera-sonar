import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./dropdown.css";
export function LinearDropdown({
    options,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [localOptions, setLocalOptions] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const inputRef = useRef();
    const toggling = () => {
        if (!disabled) {
            if (isOpen) {
                inputRef.current.blur();
            } else {
                inputRef.current.focus();
            }

            setIsOpen(!isOpen);
        }
    };

    const filterOptions = (e) => {
        //resetting the options on every render
        // setSelectedOption(null);
        //filtering the options
        let filteredOptions = options.filter((option) =>
            option.toLowerCase().includes(e.target.value.toLowerCase())
        );
        if (filteredOptions.length > 0) {
            setLocalOptions(filteredOptions);
            setSelectedOption(filterOptions[0]);
        } else {
            setLocalOptions([]);
        }
    };

    const onOptionClicked = (value, i) => {
        setSelectedOption(value);
        setselected(value);
        setIsOpen(false);
    };
    useEffect(() => {
        //resetting the options on every render
        setLocalOptions(options);
        setSelectedOption(selected);
    }, [isOpen, selected, options]);
    return (
        <div
            className={disabled ? `dropdowndropdownDisabled ` : `dropdown`}
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            unselectable
        >
            <div
             role="button"
  tabIndex={0}
  onClick={toggling}
                style={{ padding: padding, color: color }}
                className="innerDiv"
            >
                <input
                    onChange={(e) => {
                        filterOptions(e);
                        setSelectedOption(e.target.value);
                    }}
                    placeholder={placeholder}
                    value={selectedOption}
                    required={required}
                    disabled={disabled}
                    ref={(input) => (inputRef.current = input)}
                />
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul className="ul">
                    {localOptions !== undefined && localOptions.length > 0 ? (
                        localOptions.map((option, i) => (
                            <li
                                onClick={() => onOptionClicked(option, i)}
                                key={option} 
                                role="option"
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        <li>No Options</li>
                    )}
                </ul>
            )}
        </div>
    );
}
LinearDropdown.defaultProps = {
    label: "Select Field",
    options: ["Option 1", "Option 2"],
    placeholder: "Select",
    padding: "0.5rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};

//take an array of objects and return an array of objects with the key value pair
export function SelectForObjects({
    options,
    optionName,
    optionID,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [localOptions, setLocalOptions] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const inputRef = useRef();
    const toggling = () => {
        if (!disabled) {
            if (isOpen) {
                inputRef.current.blur();
            } else {
                inputRef.current.focus();
            }

            setIsOpen(!isOpen);
        }
    };

    const filterOptions = (e) => {
        let filteredOptions = options.filter((option) =>
            option[optionName]
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        if (filteredOptions.length > 0) {
            setLocalOptions(filteredOptions);
        } else {
            setLocalOptions([]);
            setSelectedOption(null);
        }
    };
    const onOptionClicked = (value) => {
        setSelectedOption(value[optionName]);
        activeOptionIndex(value[optionID]);
        setselected(value);
        setIsOpen(false);
    };
    useEffect(() => {
        setLocalOptions(options);

        setSelectedOption(selected);
    }, [isOpen, selected, options]);

    return (
        <div
            className={disabled ? `dropdown dropdownDisabled` : `dropdown`}
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            unselectable
        >
            <div
                onClick={toggling}
                style={{ padding: padding, color: color }}
                className="innerDiv"
            >
                <input
                    onChange={(e) => {
                        filterOptions(e);
                        setSelectedOption(e.target.value);
                    }}
                    placeholder={placeholder}
                    value={selectedOption}
                    required={required}
                    disabled={disabled}
                    ref={(input) => (inputRef.current = input)}
                />
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul className="ul">
                    {localOptions !== undefined && localOptions.length > 0 ? (
                        localOptions.map((option, i) => (
                            <li
                                onClick={() => onOptionClicked(option)}
                                key={i}
                            >
                                {option[optionName]}
                            </li>
                        ))
                    ) : (
                        <li>No Options</li>
                    )}
                </ul>
            )}
        </div>
    );
}

SelectForObjects.defaultProps = {
    options: ["Option 1", "Option 1", "Option 1", "Long Item Labelsdjbfbh"],
    label: "Select Field",
    placeholder: "Select",
    padding: "0.35rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};
