import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
export function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative z-10 px-6 py-32 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm p-12 md:p-16">
        <div className="relative text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-4">
            <Rocket className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl text-white !font-header-font">
            Ready to Launch Your Learning Journey?
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join many students who are already mastering their subjects with AstroDecks. Start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => navigate('/sign-in')} className="py-4 h-fit border-primary border-2 hover:border-primary-200" variant={"default"}>
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-gray-600">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
}