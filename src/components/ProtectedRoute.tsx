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
  }, [authorized]);

  if (authorized === null) return (
    <div className="bg-background flex items-center justify-center flex-col h-screen">
      <div className="rounded-full border-primary border-t-transparent border-4 w-10 h-10 animate-spin"></div>
      <h1 className="font-header-font font-semibold text-3xl mt-7">Loading decks...</h1>
      <p className=" !text-sm text-foreground/80">This may take a while.</p>
    </div>
  );
  if (!authorized) return <Navigate to="/sign-in" replace />;
  return children;
}
