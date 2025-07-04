import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUser } from "../state/user/userSlice";

export default function Layout() {
  const navigate = useNavigate();
  const userData = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { getToken, isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    const fetchExternalData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("http://localhost:3000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data) {
          navigate("/sign-in");
          return;
        }

        dispatch(fetchUser(data))
        return
      } catch (error) {
        console.error("Error Message: " + error);
        navigate("/sign-in");
      }
    };

    fetchExternalData();
  }, [isLoaded, isSignedIn]);

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  } else if (isLoaded && isSignedIn) {
    return (
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="w-full">
          <header className="flex items-center justify-end px-5 min-h-[5rem] sticky z-50 bg-white top-0 border-b-[1px]">
            <div className="scale-125 flex items-center">
              <UserButton />
            </div>
          </header>
          <Outlet />
        </div>
      </SidebarProvider>
    );
  }
}
