import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    // const userToken = localStorage.getItem('userInfo');
    const arrCookies = document.cookie.split(';');
    let userid = false;
    arrCookies.forEach((arrCookie) => {
        if (arrCookie.indexOf('userId=') !== -1) {
            userid = true;
        }
    });

    return userid;
};

const PrivateProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateProtectedRoute;
