import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`, {
          withCredentials: true,
        });
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      }
    };

    check();
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/sign-in" replace />;
  return children;
}
