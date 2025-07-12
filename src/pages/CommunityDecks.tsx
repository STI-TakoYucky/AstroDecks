import DeckComponent from "@/components/Deck";
import { useEffect, useState, type FormEvent } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import type { DeckInterface } from "@/types";
import axios from "axios";

export default function CommunityDecks() {

  const [decks, setDecks] = useState<DeckInterface[]>([])
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    if (!user._id) return
    if (decks.length > 0) return
    
    const fetchCommunityDecks = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/decks')
        setDecks(data)
      } catch (error: any) {
        console.error(error.response.data.message)
      }
    }

    fetchCommunityDecks()
  }, [user._id])

  return (
    <>
      <main className="main-container">
        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,17rem))] gap-7">
          {decks?.map((data: any) => {
            return <DeckComponent key={data._id} deck={data}></DeckComponent>;
          })}
        </section>
      </main>
    </>
  );
}
