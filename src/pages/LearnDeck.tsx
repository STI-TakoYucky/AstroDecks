import Flashcard from '@/components/FlashcardComponents/Flashcard';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/reduxHooks';
import type { CardInterface } from '@/types';
import axios from 'axios';
import _ from 'lodash';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function LearnDeck() {   

    const query = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const definitionsFirst = searchParams.get("definitionsFirst") === "true";
    const [cards, setCards] = useState<CardInterface[]>([])
    const [cardIndex, setCardIndex] = useState<number>(0)
    const user = useAppSelector(state => state.user._id)
    const [progress, setProgress] = useState<number>(0)
    const navigate = useNavigate();

    useEffect(() => {
    if (!user || !query.id) return;

    const loadDeck = async () => {
        let deck

        if (!deck) {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/decks/deck/${query.id}`);
            deck = data;
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            return;
        }
        }

        if (deck?.cards) {
        setCards(_.shuffle(deck.cards));
        }
    };

    loadDeck();
    }, [user, query.id]);


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
        <nav>
            <ChevronLeft size={40} className='cursor-pointer hover:bg-slate-100 rounded-full transition-all duration-200 hover:text-black-200' onClick={() => navigate(-1)}></ChevronLeft>
        </nav>
        <section className='flex flex-col items-center justify-around h-full'>
            <section className='w-full flex justify-center'>
                <div className='w-[100%] max-w-[40rem] border-2 rounded-md h-6 overflow-hidden !border-foreground'>
                    <div className={`bg-green-600 h-full transition-all duration-300`} style={{ width: `${progress}%` }}></div>
                </div>
            </section>
            
                { cardIndex != cards.length ?
                    <Flashcard key={cardIndex} definitionsFirst={definitionsFirst} front={cards[cardIndex]?.term} back={cards[cardIndex]?.definition || ""}></Flashcard>:
                    <div className='text-center'>
                        <h1 className="text-4xl font-semibold mb-10">
                            You have completed this deck!
                        </h1>
                        <Button variant={"default"} onClick={() => navigate(-1)}>Return to deck</Button>
                    </div>
                }

            <nav className='flex gap-2 w-full justify-center'>
                <Button type='button' variant={"default"} onClick={handleDecrement}>Back</Button>
                <Button type='button' variant={"default"} onClick={handleIncrement}>Next</Button>
            </nav>
        </section>
    </main>
  )
}
