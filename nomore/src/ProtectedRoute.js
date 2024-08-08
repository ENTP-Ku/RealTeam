import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({ element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated() ? element : <Navigate to="/" />}
        />
    );
};

export default ProtectedRoute;
