import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export default function SecuredRoutes() {
    return (

        sessionStorage.getItem('login') ? (
            <Outlet />
        ) :
            <Navigate exact to="/" />

    );
}