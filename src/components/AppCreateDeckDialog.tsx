import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, type FormEvent } from "react";
import type { DeckInterface } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function AppDialog({ handleSubmit }: {handleSubmit: (e: FormEvent<HTMLFormElement>, data: DeckInterface) => void}) {

  const author = useAppSelector(state => state.user.username)
  const [title, setTitle] = useState<string>("")

  return (
    <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="border-2 text-base font-semibold border-black rounded-md pr-3 pl-2 py-1 cursor-pointer hover:bg-black hover:text-white"
          >
            <span className="flex items-center justify-center gap-1">
              <Plus /> Create Deck
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleSubmit(e, {title, author, cards: []})} className="flex-col gap-5 flex">
          <DialogHeader>
            <DialogTitle>Create Deck</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
                <Label>Title</Label>
              <Input id="name-1" name="name" defaultValue="Untitled" onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="submit">Confirm</Button>
            </DialogClose>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  );
}
