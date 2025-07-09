import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import type { CardInterface } from "@/types";
import { FlashcardDialog } from "./FlashcardDialog";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteCard, editCard } from "@/state/userDecks/userDecksSlice";
import { CustomAlertDialog } from "./CustomAlertDialog";

export default function FlashcardComponent({ cards, deck }: {cards: CardInterface[]; deck: any; }) {
    const dispatch = useAppDispatch();

    const handleSubmit = (cardData: CardInterface) => {
        dispatch(editCard({ _id: deck?._id, cardData: cardData }));
    };

    const handleDeleteCard = (cardId: string) => {
        dispatch(deleteCard({_id: deck?._id, cardId: cardId}))
    }

  return (
    <section className="flex flex-col gap-4">
      {cards.map((item: CardInterface) => (
        <div key={item._id} className="flex items-stretch bg-white border border-gray-200 !min-h-[7rem] rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="w-1/2 p-4">
            <p className="whitespace-pre-line text-gray-900 font-medium text-lg">
              {item.term}
            </p>
          </div>

          {item.definition && (
            <div className="w-1 my-3 rounded-full bg-gray-300"></div>
          )}

          <div className="w-1/2 p-4 flex flex-col justify-between">
            <p className="whitespace-pre-line text-gray-700">
              {item.definition}
            </p>

            <div className="flex gap-2 justify-end mt-4">
              <FlashcardDialog
                handleSubmit={handleSubmit}
                editCardData={{
                  _id: item._id,
                  term: item.term,
                  definition: item.definition,
                }}>
                <Button size="icon" variant="ghost">
                  <Pencil className="w-5 h-5 text-blue-600" />
                </Button>
              </FlashcardDialog>

            <CustomAlertDialog title={"Delete this card?"} desc={"This action can not be undone."} handleSubmit={() => handleDeleteCard(item._id)}>
                <Button size="icon" variant="ghost">
                    <Trash className="w-5 h-5 text-red-500" />
                </Button>
            </CustomAlertDialog>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
