import { Brain, Users, Zap } from 'lucide-react';
const features = [
  {
    icon: Brain,
    title: 'Smart Quiz Mode',
    description: 'Test your knowledge with adaptive quizzes that adjust to your learning pace and identify areas that need more practice.',
  },
  {
    icon: Users,
    title: 'Deck Sharing',
    description: 'Collaborate with fellow learners by sharing your carefully crafted decks across the galaxy of knowledge seekers.',
  },
  {
    icon: Zap,
    title: 'Flashcard Reviewing',
    description: 'Experience the power of spaced repetition with our intelligent review system that optimizes your learning trajectory.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl text-white mb-4">
          Launch Your Learning
        </h2>
        <p className="text-xl text-gray-500">
          Powerful features designed to propel your study sessions into the stratosphere
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-8 bg-white/5 border-2 border-white/10 rounded-2xl hover:border-primary transition-all hover:scale-105 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
              <feature.icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl text-white mb-4 !font-header-font">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}