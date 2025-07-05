import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ExternalLink, SquarePen, Trash } from "lucide-react"

export function AppDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="hover:bg-slate-200 rounded-full bg-slate-100 border-[1px] cursor-pointer p-1 transition-all duration-200"> 
            <ChevronDown size={20}/>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem><SquarePen /> Rename</DropdownMenuItem>
        <DropdownMenuItem><ExternalLink /> Share</DropdownMenuItem>
        <DropdownMenuItem><Trash /> Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
