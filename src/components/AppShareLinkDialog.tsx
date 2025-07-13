import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";


export default function AppShareLinkDialog({open, onOpenChange, url}: {open: boolean, onOpenChange: React.Dispatch<React.SetStateAction<boolean>>, url: string}) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Share this deck with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`http://localhost:5173/community-decks/${url}`}
              readOnly
            />
          </div>
        </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

        