import { Hero } from '@/components/LandingPageComponents/Hero';
import { Features } from '@/components/LandingPageComponents/Features';
import { CTA } from '@/components/LandingPageComponents/CTA';
import { Navigation } from '@/components/LandingPageComponents/Navigation';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
      </div>

      <Navigation />
      <Hero />
      <Features />
      <CTA />

      <style>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${Array.from({ length: 200 }, () => {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            return `${x}px ${y}px #FFF`;
          }).join(', ')};
          animation: animStar 50s linear infinite;
        }

        .stars::after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${Array.from({ length: 200 }, () => {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            return `${x}px ${y}px #FFF`;
          }).join(', ')};
        }

        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${Array.from({ length: 100 }, () => {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            return `${x}px ${y}px #FFF`;
          }).join(', ')};
          animation: animStar 100s linear infinite;
        }

        .stars2::after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${Array.from({ length: 100 }, () => {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            return `${x}px ${y}px #FFF`;
          }).join(', ')};
        }
      `}</style>
    </div>
  );
}