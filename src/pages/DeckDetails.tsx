import { FlashcardDialog } from "@/components/FlashcardDialog";
import { DeckDropdown } from "@/components/DeckDropdown";
import FlashcardComponent from "@/components/FlashcardPreview";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addCard, changeVisibility, fetchDecks, updateDeckCards } from "@/state/userDecks/userDecksSlice";
import type { CardInterface, DeckInterface } from "@/types";
import { Loader2, LockKeyhole, Plus, UnlockKeyhole } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import isEqual from 'lodash.isequal';
import { debounce } from "lodash";

export default function DeckDetails() {
  const dispatch = useAppDispatch();
  const query = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate()
  const didMountRef = useRef(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
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
    // if user id is missing, return
    if (!user._id) return;
    // if deck is missing fetch the deck and return
    if (!deck) { dispatch(fetchDecks(user._id)); return }
    if (!isPublic) setPublic(deck.public)

      // Skip first run
    if (!didMountRef.current) {
      didMountRef.current = true;
      prevDeckRef.current = deck;
      return;
    }

    // Don't run comparison until both are defined
    if (deck && prevDeckRef.current) {
      const hasChanged = !isEqual(prevDeckRef.current, deck);
      if (hasChanged) {
        setUnsavedChanges(true);
      }
      prevDeckRef.current = deck;
    }
  }, [deck, user._id]);

  useEffect(() => {
    if (!decks) return;
      const found = decks.find((item: DeckInterface) => item._id === query.id);
    if (found) {
      setDeck(found);
    }
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

  //debounce
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
      {
        deck && (deck.public || deck.authorID === user._id) && 
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-md`} style={{backgroundColor: deck?.color}}></div>
              <div className="flex items-center">
                <h1 className="text-md md:text-3xl tracking-wide font-semibold !max-w-[30rem] truncate">
                  {deck?.title}
                </h1>
                {deck && <DeckDropdown deck={deck}></DeckDropdown>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 mt-5">
            <div className="max-w-8 max-h-8">
              {user.imageUrl && (
                <img className="rounded-full" src={user.imageUrl}></img>
              )}
            </div>
            <h2>{user?.username}</h2>
          </div>
        </header>
      }

      {
        deck && (deck.public || deck.authorID === user._id) ? 
        <section className="h-[80%]">
          <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Button
                type="button" 
                onClick={() => setPublic((prev) => !prev)}
                variant={isPublic ? "outline": "default"}
                className={isPublic ? "!bg-background hover:!bg-foreground hover:!text-background !border-foreground text-foreground": "bg-foreground text-background hover:!bg-foreground/90"}
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
                onClick={() => navigate(`/learn/${deck?._id}`)}
              >
                Learn Deck
              </Button>

              {hasUnsavedChanges && (
                <Button
                  onClick={saveChanges}
                  disabled={loading}
                  className="min-w-[7rem] bg-[#3C8D63] hover:!bg-[#3C8D63]/70"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Loading" : "Save Changes"}
                </Button>
              )}
            </div>
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
        </section> :
        <section className="h-[100%]">
          <article className="w-full h-[100%] items-center justify-center flex-col flex gap-5">
            <h1 className="font-semibold text-4xl">
              Deck not found or this deck is private. 
            </h1>
          </article>
        </section> 
      }
    </main>
  );
}
