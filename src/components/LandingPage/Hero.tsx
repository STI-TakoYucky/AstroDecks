import { Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

export function Hero() {
    const navigate = useNavigate()
  return (
    <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-md w-fit">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">Spaced Repetition, Reimagined</span>
          </div>

          <h1 className="text-6xl lg:text-7xl !font-header-font text-white">
            Reach for your cards!
          </h1>

          <p className="text-xl text-gray-400 max-w-lg">
            Master any subject with AstroDecks - the flashcard app that launches your learning into orbit with intelligent spaced repetition.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="py-4 h-fit border-primary border-2 hover:border-primary-200" onClick={() => navigate("/sign-in")} variant={"default"}>
                Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button className='h-fit py-4 bg-transparent text-white border-2 border-gray-700 hover:bg-white/5' variant={"outline"}>Watch Demo</Button>
          </div>
          </div>

        <div className="relative">
          <div className="relative bg-white/5 border border-white/10 rounded-md p-8 backdrop-blur-sm">
            {/* Mockup of flashcard interface */}
            <div className="space-y-4">
              <div className="bg-white rounded-md p-6 shadow-lg">
                <div className="text-gray-900 mb-4">What is spaced repetition?</div>
                <div className="text-sm text-gray-600">A learning technique that involves reviewing information at increasing intervals...</div>
              </div>
              <div className="bg-white rounded-md p-6 shadow-lg opacity-75">
                <div className="text-gray-900 mb-4">Define: CTE</div>
                <div className="text-sm text-gray-600">Common Table Expression - a temporary named result set...</div>
              </div>
              <div className="bg-white rounded-md p-6 shadow-lg opacity-50">
                <div className="text-gray-900 mb-4">SQL: ORDER BY</div>
                <div className="text-sm text-gray-600">Used to sort the result set in ascending or descending order...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}