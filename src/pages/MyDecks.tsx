import AppCreateDeckDialog from "@/components/AppCreateDeckDialog";
import CardDeckComponent from "@/components/CardDeckComponent";
import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import type { DeckInterface } from "@/types";
import { addDecks } from "@/state/userDecks/userDecksSlice";

export default function MyDecks() {

  const state = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()


  const handleSubmit = (e: FormEvent<HTMLFormElement>, data: DeckInterface): void => {
    e.preventDefault();
    dispatch(addDecks(data))
  };

  return (
    <>
      <main className="w-full px-[4rem] py-[3rem] h-[100%]">
        <section className="w-full z-10 mb-10">
          <AppCreateDeckDialog handleSubmit={handleSubmit}></AppCreateDeckDialog>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,17rem))] gap-7">
          {state.decks.map((data: any, index: number) => {
            console.log(state)
            return (
              <CardDeckComponent key={index} data={data} index={index}></CardDeckComponent>
            );
          })}
        </section>
      </main>
    </>
  );
}
