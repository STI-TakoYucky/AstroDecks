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
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, SquarePen, Trash } from "lucide-react";
import AppDialog from "./AppDialog";
import { useState, type FormEvent } from "react";
import type { DeckInterface } from "@/types";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteDeck, renameDeck } from "@/state/userDecks/userDecksSlice";
import { AppCustomAlert } from "./AppCustomAlert";
import { useNavigate } from "react-router-dom";

export function DeckDropdown({ deck }: { deck: DeckInterface }) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(deck.title);
  const [isRenameOpen, setRenameOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleRenameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(renameDeck({ newTitle: title, deck }));
    setRenameOpen(false);
  };

  const handleDeleteSubmit = () => {
    if (!deck._id) return
    dispatch(deleteDeck(deck._id))
    navigate('/my-decks')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="hover:bg-slate-200 rounded-full bg-slate-100 border-[1px] cursor-pointer p-1 transition-all duration-200">
            <ChevronDown size={20} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem onClick={() => setRenameOpen(true)}>
            <SquarePen /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExternalLink /> Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {
        //with how shadcn is programmed, dropdownmenu cant open its app dialog so you have to use dynamic rendering for it
        isRenameOpen && (
          <AppDialog
            open={isRenameOpen}
            onOpenChange={setRenameOpen}
            handleSubmit={handleRenameSubmit}
            inputFields={[{ label: "Title", value: title, mutator: setTitle }]}
            dialogTitle="Rename Deck"
          ></AppDialog>
        )
      }

      {alertOpen && (
        <AppCustomAlert
          handleSubmit={handleDeleteSubmit}
          title={"Confirm Delete?"}
          desc={"This action can not be undone."}
          open={alertOpen}
          onOpenChange={setAlertOpen}
        ></AppCustomAlert>
      )}
    </>
  );
}
