import Flashcard from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchDecks } from '@/state/userDecks/userDecksSlice';
import type { CardInterface, DeckInterface } from '@/types';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export default function LearnDeck() {   

    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch()
    const localDecks = useAppSelector(state => state.userDecks.decks)
    const [cards, setCards] = useState<CardInterface[]>([])
    const [cardIndex, setCardIndex] = useState<number>(0)
    const user = useAppSelector(state => state.user._id)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (!user) return
        if (localDecks.length === 0) {
            dispatch(fetchDecks(user));
            return;
        }

        const deck = localDecks.find(item => item._id === params.id)
        setCards(_.shuffle(deck?.cards))
        
    }, [localDecks, user])

    useEffect(() => {
        setProgress((cardIndex / cards.length) * 100)
    }, [cardIndex])

    const handleIncrement = () => {
        setCardIndex(prev => {
            if (prev != cards.length) {
                return prev + 1
            }
            return prev
        })
    }

    const handleDecrement = () => {
        setCardIndex(prev => {
            if (prev != 0) {
                return prev - 1
            }
            return prev
        })
    }
    
  return (
    <main className='main-container'>
        <section className='flex flex-col items-center justify-between h-full'>
            <section>
                <div className='w-[20rem] border-2 rounded-md h-10 overflow-hidden'>
                    <div className={`bg-green-600 h-full transition-all duration-300`} style={{ width: `${progress}%` }}></div>
                </div>
            </section>
            { cardIndex != cards.length ?
                <Flashcard front={cards[cardIndex]?.term} back={cards[cardIndex]?.definition || ""}></Flashcard>:
                <div>
                    <h1 className="text-4xl font-semibold">
                    You have completed this deck!
                    </h1>
                </div>
            }

            <nav className='flex gap-2'>
                <Button type='button' variant={"default"} onClick={handleDecrement}>Back</Button>
                <Button type='button' variant={"default"} onClick={handleIncrement}>Next</Button>
            </nav>
        </section>
    </main>
  )
}
