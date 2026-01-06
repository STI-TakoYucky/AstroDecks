import { Pencil, Trash } from "lucide-react";
import type { CardInterface, DeckInterface } from "@/types";
import { FlashcardDialog } from "./FlashcardDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { deleteCard, editCard } from "@/state/userDecks/userDecksSlice";
import { CustomAlertDialog } from "../ReusableComponents/CustomAlertDialog";

export default function FlashcardComponent({
  cards,
  deck,
}: {
  cards: CardInterface[];
  deck: DeckInterface;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleSubmit = (cardData: CardInterface) => {
    dispatch(editCard({ _id: deck?._id, cardData: cardData }));
  };

  const handleDeleteCard = (cardId: string) => {
    dispatch(deleteCard({ _id: deck?._id, cardId: cardId }));
  };

  return (
    <section className="flex flex-col gap-4">
      {cards.map((item: CardInterface) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-stretch bg-white border border-gray-200 !min-h-[7rem] rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
        >
          {/* TERM */}
          <div className="md:w-1/2 p-4">
            <p className="whitespace-pre-line text-gray-900 font-medium md:!text-xl">
              {item.term}
            </p>
          </div>

          {/* DEFINITION */}
          <div className="md:w-1/2 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
            <p className="whitespace-pre-line text-black-100 md:!text-xl">
              {item.definition}
            </p>

            {user._id == deck.authorID && (
              <div className="flex gap-4 justify-end mt-4">
                <FlashcardDialog
                  handleSubmit={handleSubmit}
                  editCardData={{
                    _id: item._id,
                    term: item.term,
                    definition: item.definition,
                  }}
                >
                  <Pencil className="w-5 h-5 text-primary cursor-pointer" />
                </FlashcardDialog>

                <CustomAlertDialog
                  title={"Delete this card?"}
                  desc={"This action can not be undone."}
                  handleSubmit={() => handleDeleteCard(item._id)}
                >
                  <Trash className="w-5 h-5 text-primary cursor-pointer" />
                </CustomAlertDialog>
              </div>
            )}
          </div>
        </div>

      ))}
    </section>
  );
}
