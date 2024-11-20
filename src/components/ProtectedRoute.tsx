import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"
import { RootState } from "../store/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    
    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    if (!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return (
    <> 
      {children}
    </>
  )
}

export default ProtectedRoute
