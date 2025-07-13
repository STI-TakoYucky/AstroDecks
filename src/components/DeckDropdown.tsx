import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, SquarePen, Trash } from "lucide-react";
import AppDialog from "./AppInputDialog";
import { useEffect, useState, type FormEvent } from "react";
import type { DeckInterface } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { deleteDeck, renameDeck } from "@/state/userDecks/userDecksSlice";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { useNavigate } from "react-router-dom";
import AppShareLinkDialog from "./AppShareLinkDialog";

export function DeckDropdown({ deck }: { deck: DeckInterface }) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user)
  const [title, setTitle] = useState<string>("");
  const [isRenameOpen, setRenameOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [isShareOpen, setShareOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleRenameSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!title) return
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
          <span className="dark:hover:!bg-black-100 hover:!bg-black/10 rounded-full cursor-pointer transition-all duration-200">
            <ChevronDown size={25} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-none bg-white" align="start">
          {
            user._id === deck.authorID && (
              <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                <SquarePen /> Rename
              </DropdownMenuItem>
            )
          }
          <DropdownMenuItem  onClick={() => setShareOpen(true)}>
            <ExternalLink/> Share
          </DropdownMenuItem>
          {
            user._id === deck.authorID && (
              <DropdownMenuItem onClick={() => setAlertOpen(true)}>
                <Trash /> Delete
              </DropdownMenuItem>
            )
          }
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
        <CustomAlertDialog
          handleSubmit={handleDeleteSubmit}
          title={"Confirm Delete?"}
          desc={"This action can not be undone."}
          open={alertOpen}
          onOpenChange={setAlertOpen}
        ></CustomAlertDialog>
      )}

      { isShareOpen && (
        <AppShareLinkDialog open={isShareOpen} onOpenChange={setShareOpen} url={deck._id || ""}></AppShareLinkDialog>
      )}
    </>
  );
}
