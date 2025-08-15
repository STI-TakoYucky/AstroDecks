import { Navigate } from "react-router-dom";
import { useContext } from "react";
import type { JSX } from "react/jsx-runtime";
import { AuthContext } from "./AuthProvider";
import LoadingComponent from "./LoadingComponent";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {

  const { authenticated } = useContext(AuthContext)
  
  if (authenticated === null) {
      return (
        <LoadingComponent></LoadingComponent>
      );
    }

    if (authenticated === false) {
      return <Navigate to="/sign-in" replace />;
    }

    return children;
  }
