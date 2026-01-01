import QuizComponent from '@/components/QuizComponent';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/reduxHooks';
import type { CardInterface } from '@/types';
import axios from 'axios';
import _ from 'lodash';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizDeck() {
  const navigate = useNavigate();
  const query = useParams<{ id: string }>();
  const userDeck = useAppSelector((state) => state.userDecks);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currIndex, setCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<CardInterface[]>([])
  const [choices, setChoices] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [isQuizFinished, setQuizFinished] = useState<boolean>(false);

  useEffect(() => {

    const fetchDeck = async () => {
      const { data: deck } = await axios.get(`${import.meta.env.VITE_API_URL}/api/decks/deck/${query.id}`);

      if(deck) {
        //store the cards which serves as the questions and the answer key
        setCards(_.shuffle(deck?.cards));
        //get all the backs of the flashcards and randomly choose 3    

        setChoices(deck.cards.map((card: CardInterface) => card.definition!))
      } else {
        return;
      }

      setTimeout(() => setLoading(false), 1000)
    }

    fetchDeck()
    
  }, [query.id, userDeck])

  //cycling through the questions
  
  useEffect(() => {
    if (cards.length === 0) return;

    setProgress(((currIndex + 1) / cards.length) * 100);
  }, [currIndex, cards.length]);

    const handleIncrement = () => {
      setCardIndex(prev => {
        if (prev === cards.length - 1) {
          setQuizFinished(true);
          return prev;
        }
        return prev + 1;
      });
    };


    const handleScore = (isCorrect: boolean) => {
      isCorrect && setScore(prev => prev + 1);

      setTimeout(() => {
        handleIncrement();
      }, 1000)
    }

    const restartQuiz = () => {
      setCards(_.shuffle(cards)) //reshuffle the deck
      setScore(0)
      setCardIndex(0);
      setQuizFinished(false)
      setProgress(0)
    }

  return (
    <main className='main-container'>
      {
        loading ? 
        <div className='flex items-center justify-center w-full h-full flex-col'>
          <div className="rounded-full border-primary border-t-transparent border-4 w-10 h-10 animate-spin"></div>
          <h1 className="font-header-font font-semibold text-3xl mt-7">Loading decks...</h1>
          <p className=" !text-sm dark:text-foreground/80">This may take a while.</p>
        </div>:
        <>
        { isQuizFinished ? 
        <div className="flex flex-col items-center justify-center h-full text-center gap-6">
          <h1 className="text-4xl font-semibold">
            Great Job! 🎉
          </h1>

          <p className="text-lg font-medium">
            You scored
            <span className="mx-2 text-2xl font-bold text-blue-600">
              {score}
            </span>
            out of
            <span className="mx-2 text-2xl font-bold">
              {cards.length}
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            Keep practicing to improve your score.
          </p>

          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Return to deck
            </Button>

            <Button
              variant="default"
              onClick={restartQuiz}
            >
              Quiz Again
            </Button>
          </div>
        </div>
        :
          <>
          <nav>
            <ChevronLeft
              size={40}
              className='cursor-pointer hover:bg-slate-100 rounded-full transition-all duration-200 hover:text-black-200'
              onClick={() => {
                navigate(-1)
              }}
            />
          </nav>

          <section className='flex flex-col items-center justify-start gap-10 mt-10 h-full'>
            {/* Progress Bar */}
            <section className='w-full flex justify-start items-center flex-col'>
              <div className='w-[100%]  max-w-2xl border-2 rounded-md h-6 overflow-hidden !border-foreground'>
                <div
                  className='bg-green-600 h-full transition-all duration-300 w-0'
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className='w-full max-w-2xl mt-7'>
                <p>Score: {score} / {cards.length}</p>
              </div>
            </section>

            {/* Quiz Content */}
            
            <QuizComponent handleScore={handleScore} choices={_.sampleSize(choices.filter(item => item != cards[currIndex].definition), 3)} answer={cards[currIndex].definition!} question={cards[currIndex].term} index={currIndex} length={cards.length}></QuizComponent>
            
          </section>
          </>
        }
        </>
      }
      
    </main>
  );
}
