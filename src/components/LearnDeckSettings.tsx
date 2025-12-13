import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { AppCustomAlert } from "@/types"
// import { Switch } from "@/components/ui/switch";
// import { useState } from "react";
import studyIcon from '/images/study-icon.png'
import quizIcon from '/images/quiz-icon.png'
import { Card } from "./ui/card";

export function LearnDeckSettings({children, open, onOpenChange, handleSubmit}: AppCustomAlert) {

    // const [isDefinitionsFirst, setDefinitionsFirst] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-foreground text-black-200 border-none">
        <DialogHeader>
          <DialogTitle>How do you want to study?</DialogTitle>
          <DialogDescription className="gap-5 my-5 text-dark-100 flex md:flex-row flex-col justify-around">
            {/* <div className="flex items-center gap-2">
                <Switch onClick={() => setDefinitionsFirst((prev) => !prev)} className=" cursor-pointer shadow-md"/>
                <p>Back first</p>
            </div> */}

            <Card onClick={() => handleSubmit("learn")} className="hover:!bg-primary hover:!text-white bg-background flex items-center w-full p-10 text-center top-0 hover:top-2 hover:shadow-none transition-all ease-in-out duration-100 relative cursor-pointer">
              <img className="md:w-[8rem] w-[4rem] h-auto" src={studyIcon}></img>
              <p>Learn Deck Using Flashcards</p>
            </Card>

            <Card className="hover:!bg-primary hover:!text-white w-full p-10 text-center flex items-center top-0 hover:top-2 hover:shadow-none transition-all ease-in-out duration-100 relative cursor-pointer">
              <img className="md:w-[8rem] w-[4rem] h-auto" src={quizIcon}></img>
              <p>Take a Quiz</p>
            </Card>
          </DialogDescription>
        </DialogHeader>
        {/* <DialogFooter>
          <DialogCancel>Cancel</DialogCancel>
          <DialogAction onClick={() => console.log("Test")}>Continue</DialogAction>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
