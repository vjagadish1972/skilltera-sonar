import React, { createContext, useState, useMemo } from "react";

export const ErrorContext = createContext();

export const ErrorContextState = (props) => {
    const [errorStatus, setErrorStatus] = useState(false);
    const value = useMemo(
        () => ({ errorStatus, setErrorStatus }),
        [errorStatus]
    );
    return (
        <ErrorContext.Provider value={value}>
            {props.children}
        </ErrorContext.Provider>
    );
};
