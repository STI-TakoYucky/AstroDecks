import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { UserButton, useAuth, useClerk } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUser } from "../state/user/userSlice";
import { Switch } from "@/components/ui/switch";
import { Moon, PanelLeft, Sun } from "lucide-react";import type { CSSProperties } from "react";

// ---- inner component to safely call useSidebar ----
function InnerLayout() {
  const navigate = useNavigate();
  // const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { toggleSidebar, isMobile } = useSidebar();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    (async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data) return navigate("/sign-in");

        dispatch(fetchUser(data));
      } catch (error: any) {
        console.error("Error Message: " + error.response);
        if (error.name === "AxiosError") {
          alert("Failed to authenticate user. Please Login again.");
          signOut();
        }
      }
    })();
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="text-xl font-semibold font-body-font">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <AppSidebar />
      <div className="w-full transition-theme">
        <header className={`transition-theme flex items-center ${ isMobile ? "justify-between": "justify-end"} px-5 bg-background min-h-[5rem] sticky z-50 top-0 border-b-[1px] gap-5`}>
          { isMobile && <PanelLeft className="cursor-pointer" onClick={toggleSidebar} />}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
              <Switch
                checked={theme === "dark"}
                className="cursor-pointer"
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              />
            </div>
            <div className="scale-125 flex items-center">
              <UserButton />
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
}

// ---- top-level export ----
export default function Layout() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "16rem",         // Desktop width
          "--sidebar-width-mobile": "12rem",  // Smaller on mobile
        } as CSSProperties
      }
    >
      <InnerLayout />
    </SidebarProvider>
  );
}
