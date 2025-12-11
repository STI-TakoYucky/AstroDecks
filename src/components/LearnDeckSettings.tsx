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
// import { Switch } from "@/components/ui/switch";
// import { useState } from "react";
import studyIcon from '/images/study-icon.png'
import quizIcon from '/images/quiz-icon.png'
import { Card } from "./ui/card";

export function LearnDeckSettings({children, open, onOpenChange, handleSubmit}: AppCustomAlert) {

    // const [isDefinitionsFirst, setDefinitionsFirst] = useState<boolean>(false)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-foreground text-black-200 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>How do you want to study?</AlertDialogTitle>
          <AlertDialogDescription className="my-5 text-dark-100 flex justify-around">
            {/* <div className="flex items-center gap-2">
                <Switch onClick={() => setDefinitionsFirst((prev) => !prev)} className=" cursor-pointer shadow-md"/>
                <p>Back first</p>
            </div> */}

            <Card className="w-fit p-10 text-center top-0 hover:top-2 hover:shadow-none transition-all ease-in-out duration-100 relative cursor-pointer">
              <img className="w-[8rem] h-auto" src={studyIcon}></img>
              <p>Learn Deck</p>
            </Card>

            <Card className="w-fit p-10 text-center top-0 hover:top-2 hover:shadow-none transition-all ease-in-out duration-100 relative cursor-pointer">
              <img className="w-[8rem] h-auto" src={quizIcon}></img>
              <p>Take a Quiz</p>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => console.log("Test")}>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  )
}
