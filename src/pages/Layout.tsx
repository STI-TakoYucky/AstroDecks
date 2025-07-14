import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUser } from "../state/user/userSlice";
import { Switch } from "@/components/ui/switch";
import { LogOut, Moon, PanelLeft, Sun } from "lucide-react";
import type { CSSProperties } from "react";

// ---- inner component to safely call useSidebar ----
function InnerLayout() {
  const navigate = useNavigate();
  // const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { toggleSidebar, isMobile } = useSidebar();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`, {
            withCredentials: true, // Send cookies
          });

          dispatch(fetchUser(data));
        } catch (error: any) {
          console.error("Auth error:", error);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            navigate("/sign-in");
          } else {
            alert("Something went wrong. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      };

    checkAuth();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (loading) {
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
            <div className="max-w-[2rem] flex items-center relative">
                <img src="https://i.ibb.co/8LXK5mYv/default-profile-picture.png" className=" cursor-pointer" onClick={() => setProfileOpen(prev => !prev)}></img>
                {
                  isProfileOpen && (
                    <div className="absolute w-[15rem] rounded-sm p-2 right-[.5rem] top-[2.5rem] bg-white shadow-md">
                      <span className="flex p-1 items-center hover:bg-slate-100 rounded-sm cursor-pointer">
                        <LogOut size={17} className="dark:text-background"/>
                        <p className="ml-2 select-none dark:text-background text-sm">Sign out</p> 
                      </span>
                    </div>
                  )
                }
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
