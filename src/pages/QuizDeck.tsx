import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuizDeck() {
  const navigate = useNavigate();

  return (
    <main className='main-container'>
      {/* Header Navigation */}
      <nav>
        <ChevronLeft
          size={40}
          className='cursor-pointer hover:bg-slate-100 rounded-full transition-all duration-200 hover:text-black-200'
          onClick={() => navigate(-1)}
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
        <div className='w-full max-w-2xl'>
          {/* Question Counter */}
          <div className='text-sm text-gray-500 mb-2'>
            Question 1 of 10
          </div>

          {/* Question */}
          <h2 className='text-2xl font-semibold text-center mb-8'>
            What is the capital of France?
          </h2>

          {/* Answer Options */}
          <div className='space-y-3'>
            <button className='w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer'>
              London
            </button>
            <button className='w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer'>
              Paris
            </button>
            <button className='w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer'>
              Berlin
            </button>
            <button className='w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer'>
              Madrid
            </button>
          </div>
        </div>

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
