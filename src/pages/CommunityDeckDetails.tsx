import { DeckDropdown } from "@/components/DeckDropdown";
import FlashcardsPreview from "@/components/FlashcardPreview";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/reduxHooks";
import type { CardInterface, DeckInterface, UserInterface } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function CommunityDeckDetails() {
  const query = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [isPublic, setPublic] = useState<boolean | null>(null);
  const user = useAppSelector(state => state.user)

  // the single deck filtered out
  const [deck, setDeck] = useState<DeckInterface>();
  // the cards of the deck
  const [cards, setcards] = useState<CardInterface[]>([]);
  //the author's data
  const [author, setAuthor] = useState<UserInterface>();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deck = await axios.get(`${import.meta.env.VITE_API_URL}/api/decks/deck/${query.id}`);
        const user = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${deck.data.authorID}`);

        setDeck(deck.data);
        setAuthor(user.data);
        setcards(deck.data.cards);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    };

    fetchDeck();
  }, [query]);

  const handleLearnClick = () => {
    if (user?._id !== author?._id) {
        navigate(`/learn/${deck?._id}`)
    } else {

    }
  }

  return (
    <main className="main-container">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-md`}
              style={{ backgroundColor: deck?.color }}
            ></div>
            <h1 className="text-4xl tracking-wide font-semibold max-w-[40rem] pb-4 truncate">
              {deck?.title}
            </h1>
            {deck && <DeckDropdown deck={deck}></DeckDropdown>}
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="min-w-[7rem]"
              onClick={handleLearnClick}
            >
              Learn Deck
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="max-w-8 max-h-8">
            {author && author.imageUrl && (
              <img className="rounded-full" src={author.imageUrl}></img>
            )}
          </div>
          <h2>{author?.username}</h2>
        </div>
      </header>

      <section className="h-[80%]">
        {!cards || cards.length === 0 ? (
          <article className="w-full h-[80%] items-center justify-center flex-col flex gap-5">
            <h1 className="font-semibold text-4xl">
              This public deck has no cards yet.
            </h1>
          </article>
        ) : (
          <FlashcardsPreview deck={deck!} cards={cards}></FlashcardsPreview>
        )}
      </section>
    </main>
  );
}
