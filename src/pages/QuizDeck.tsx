import QuizComponent from '@/components/QuizComponent';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/reduxHooks';
import type { DeckInterface } from '@/types';
import _ from 'lodash';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizDeck() {
  const navigate = useNavigate();
  const query = useParams<{ id: string }>();
  const userDeck = useAppSelector((state) => state.userDecks);
  const [selectedDeck, setSelectedDeck] = useState<DeckInterface | undefined>();

  useEffect(() => {
    let deck = userDeck.decks.find(deck => deck._id == query.id)
    setSelectedDeck(deck);
  }, [query.id, userDeck])

  //store the cards which serves as the questions and the answer key
  const cards = _.shuffle(selectedDeck?.cards);
  const cardsCount = cards?.length;
  console.log(cardsCount)
  console.log(cards)
  //get all the backs of the flashcards, those are the answers
  // const answers = selectedDeck?.cards.map(card => card.definition);

  //cycling through the questions
  let currIndex: number = 0

  return (
    <main className='main-container'>
      {/* Header Navigation */}
      <nav>
        <ChevronLeft
          size={40}
          className='cursor-pointer hover:bg-slate-100 rounded-full transition-all duration-200 hover:text-black-200'
          onClick={() => {
            navigate(-1)
          }}
        />
      </nav>

      <section className='flex flex-col items-center justify-around h-full'>
        {/* Progress Bar */}
        <section className='w-full flex justify-center'>
          <div className='w-[100%] max-w-[40rem] border-2 rounded-md h-6 overflow-hidden !border-foreground'>
            <div
              className='bg-blue-600 h-full transition-all duration-300'
              style={{ width: '45%' }}
            />
          </div>
        </section>

        {/* Quiz Content */}
        {
          userDeck && selectedDeck && <QuizComponent question={cards[currIndex].term} index={currIndex} length={cardsCount}></QuizComponent>
        }

        {/* Navigation Buttons */}
        <nav className='flex gap-2 w-full justify-center'>
          <Button
            type='button'
            variant='default'
          >
            Back
          </Button>
          <Button
            type='button'
            variant='default'
          >
            Next
          </Button>
        </nav>
      </section>
    </main>
  );
}
