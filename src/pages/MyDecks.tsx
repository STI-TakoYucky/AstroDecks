import AppDialog from "@/components/AppDialog";
import DeckComponent from "@/components/DeckComponent";
import { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchDecks, pushDeck } from "@/state/userDecks/userDecksSlice";
import { Plus } from "lucide-react";

export default function MyDecks() {

  const [open, onOpenChange] = useState<boolean>(false)
  const decks = useAppSelector(state => state.userDecks)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>("Untitled")

  useEffect(() => {
    if (!user._id) return
    dispatch(fetchDecks(user._id))
    console.log(user._id)
  }, [user._id])

  const AppDialogFields = [
    {
      label: "Title",
      value: title,
      mutator: setTitle
    },
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {title, author: user.username, authorID: user._id, imageUrl: user.imageUrl, cards: []}
    dispatch(pushDeck(data))
    setTitle("Untitled")
    onOpenChange(false)
  };

  return (
    <>
      <main className="w-full px-[4rem] py-[3rem] h-[100%]">
        <section className="w-full z-10 mb-10">
          <AppDialog handleSubmit={handleSubmit} dialogTitle={"Create Deck"} inputFields={AppDialogFields} open={open} onOpenChange={onOpenChange}>
            <button
              type="button"
              className="border-2 text-base font-semibold border-black rounded-md pr-3 pl-2 py-1 cursor-pointer hover:bg-black hover:text-white"
            >
              <span className="flex items-center justify-center gap-1">
                <Plus /> Create Deck
              </span>
            </button>
          </AppDialog>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,17rem))] gap-7">
          {decks?.decks.map((data: any) => {
            return <DeckComponent key={data._id} data={data}></DeckComponent>;
          })}
        </section>
      </main>
    </>
  );
}
