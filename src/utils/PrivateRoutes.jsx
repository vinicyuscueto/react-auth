import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
