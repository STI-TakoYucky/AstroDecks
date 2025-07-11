import { FlashcardDialog } from "@/components/FlashcardDialog";
import { DeckDropdown } from "@/components/DeckDropdown";
import FlashcardComponent from "@/components/FlashcardComponent";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addCard, changeVisibility, fetchDecks, updateDeckCards } from "@/state/userDecks/userDecksSlice";
import type { CardInterface, DeckInterface } from "@/types";
import { Loader2, Lock, LockKeyhole, Pencil, Plus, Trash, UnlockKeyhole } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import isEqual from 'lodash.isequal';
import { CustomAlertDialog } from "@/components/CustomAlertDialog";
import { debounce } from "lodash";

export default function DeckDetails() {
  const dispatch = useAppDispatch();
  const query = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
  const navigate = useNavigate()
  const [isPublic, setPublic] = useState<boolean | null>(null)

  // the reference to all the user's decks
  const decks = useAppSelector((state) => state.userDecks.decks);
  // the single deck filtered out
  const [deck, setDeck] = useState<DeckInterface>();
  // the cards of the filtered deck
  const cards = deck?.cards;
  const prevDeckRef = useRef<DeckInterface | undefined>(undefined);

  // check if the decks changed
  useEffect(() => {
    if (!deck) return;

    const compare = isEqual(prevDeckRef.current, deck);
    if (prevDeckRef.current && !compare) {
      setUnsavedChanges(true);
    }
    prevDeckRef.current = deck;
  }, [deck]);

  useEffect(() => {
    if (!user._id) return;
    dispatch(fetchDecks(user._id));
  }, [user._id]);

  useEffect(() => {
    if (!decks) return;
    decks.filter(
      (item: DeckInterface) => item._id == query.id && setDeck(item)
    );
  }, [query, decks]);

  // prevents the users from going to a different page when the changes arent saved
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!deck) return
    
    setPublic(deck.public)
  }, [deck])

  useEffect(() => {
    if (!deck || !deck._id) return;

    const debouncedToggle = debounce(() => {
      dispatch(changeVisibility({ _id: deck._id!, public: isPublic! }));
    }, 1000); // adjust delay as needed

    debouncedToggle();

    // Clean up to avoid memory leaks if component unmounts
    return () => {
      debouncedToggle.cancel?.();
    };
  }, [isPublic]);




  const handleSubmit = (cardData: CardInterface) => {
    dispatch(addCard({ _id: deck?._id, cardData: cardData }));
    setUnsavedChanges(true);
  };

  // push to db
  const saveChanges = () => {
    setLoading(true);
    if (!deck) return;
    dispatch(updateDeckCards(deck)).then(() => {
      setTimeout(() => {
        setLoading(false);
        setUnsavedChanges(false);
      }, 2000);
    });
  };

  return (
    <main className="main-container">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-md`} style={{backgroundColor: deck?.color}}></div>
            <h1 className="text-4xl tracking-wide font-semibold max-w-[40rem] pb-4 truncate">
              {deck?.title}
            </h1>
            {deck && <DeckDropdown deck={deck}></DeckDropdown>}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setPublic((prev) => !prev)}
              variant={"default"}
            >
              {isPublic ? <UnlockKeyhole /> : <LockKeyhole />}

              {isPublic ? "Public" : "Private"}
            </Button>
            <FlashcardDialog handleSubmit={handleSubmit}>
              <Button type="button" variant={"default"}>
                <Plus /> Add Card
              </Button>
            </FlashcardDialog>

            <Button
              className="min-w-[7rem]"
              onClick={() => navigate(`/my-decks/${deck?._id}/learn`)}
            >
              Learn Deck
            </Button>

            {hasUnsavedChanges && (
              <Button
                onClick={saveChanges}
                disabled={loading}
                className="min-w-[7rem] bg-green-600"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Loading" : "Save Changes"}
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="max-w-8 max-h-8">
            {user.imageUrl && (
              <img className="rounded-full" src={user.imageUrl}></img>
            )}
          </div>
          <h2>{user?.username}</h2>
        </div>
      </header>

      <section className="h-[80%]">
        {!cards || cards.length === 0 ? (
          <article className="w-full h-[80%] items-center justify-center flex-col flex gap-5">
            <h1 className="font-semibold text-4xl">
              Add a card to get started
            </h1>
            <FlashcardDialog handleSubmit={handleSubmit}>
              <Button type="button" variant={"default"}>
                <Plus /> Add Card
              </Button>
            </FlashcardDialog>
          </article>
        ) : (
          <FlashcardComponent deck={deck} cards={cards}></FlashcardComponent>
        )}
      </section>
    </main>
  );
}
