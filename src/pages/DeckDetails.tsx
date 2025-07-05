import { AppDropdownMenu } from "@/components/AppDropdownMenu";
import { useAppSelector } from "@/hooks/reduxHooks";
import type { DeckInterface } from "@/types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DeckDetails() {
  const query = useParams<{ id: string }>();
  const decks = useAppSelector((state) => state.userDecks.decks);
  const [deck, setDeck] = useState<DeckInterface>();

  useEffect(() => {
    //fetch deck from state, if not found fetch db

    if (!decks) return;

    decks.filter((item) => item._id == query.id && setDeck(item));
  }, [query, decks]);

  return (
    <main className="main-container">
      <section>
        <div className="flex items-center gap-3">
            <h1 className="text-4xl tracking-wide font-semibold max-w-[40rem] pb-4 truncate">{deck?.title}</h1>
            <AppDropdownMenu></AppDropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <div className="max-w-8 max-h-8">
            <img className="rounded-full" src={deck?.imageUrl}></img>
          </div>
          <h2 className="">{deck?.author}</h2>
        </div>
      </section>
      <section></section>
    </main>
  );
}
