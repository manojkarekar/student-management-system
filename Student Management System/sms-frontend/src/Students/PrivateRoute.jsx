import React, { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
 const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? children : <Navigate to="/student/login" replace />
}
