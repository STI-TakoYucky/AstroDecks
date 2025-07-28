import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { AppCustomAlert } from "@/types"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function LearnDeckSettings({title, children, open, onOpenChange, handleSubmit}: AppCustomAlert) {

    const [isDefinitionsFirst, setDefinitionsFirst] = useState<boolean>(false)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-foreground text-black-200 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>How do you want to study?</AlertDialogTitle>
          <AlertDialogDescription className="text-dark-100">
            <div className="flex items-center gap-2">
                <Switch onClick={() => setDefinitionsFirst((prev) => !prev)} className=" cursor-pointer shadow-md"/>
                <p>Definitions first</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSubmit(isDefinitionsFirst)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
