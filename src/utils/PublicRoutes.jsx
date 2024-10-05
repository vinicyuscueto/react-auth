import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicRoutes = () => {
    const { signed } = useContext(AuthContext);

    return !signed ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoutes;
