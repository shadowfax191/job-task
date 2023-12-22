/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <div className="text-center flex  justify-center mx-auto">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (user) {
        return children
    }



    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;