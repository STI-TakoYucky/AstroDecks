import { Layers, Users } from "lucide-react";
import Logo from '/images/AstroDecksLogo.svg'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "My Decks",
    url: "/my-decks",
    icon: Layers,
  },
  {
    title: "Community Decks",
    url: "/community-decks",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="transition-theme">
        <SidebarGroup className="!px-0">
          <SidebarGroupLabel className="text-xl md:text-2xl font-bold font-header-font dark:text-foreground px-5 flex items-center gap-2 cursor-pointer text-primary">
            <div><img src={Logo} alt="AstroDecksLogo" className="w-[2rem] h-[2rem]"/> </div> AstroDecks 
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-base md:text-lg mb-2 font-body-font dark:hover:bg-black-100 active:text-black-200" asChild>
                    <Link to={item.url} className="px-5 py-5 rounded-none">
                      <span className="w-5 h-5">
                        <item.icon className="w-full h-full stroke-[2]" />
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
