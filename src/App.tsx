import { useRef } from 'react';
import Embers from '@/components/Embers';
import Hero from '@/components/Hero';
import MissionLog from '@/components/MissionLog';
import TheRoster from '@/components/TheRoster';
import Registration from '@/components/Registration';

function App() {
  const registrationRef = useRef<HTMLDivElement>(null);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-zinc-200 antialiased overflow-x-hidden">
      {/* Halftone dot pattern — comic book texture */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.5] halftone-dots" style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)' }} />

      {/* Film grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.035] film-grain mix-blend-overlay" />

      {/* Global ambient glow — Marvel red */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/4 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-[150px]" />
      </div>

      {/* Global floating embers — spans entire page behind content */}
      <Embers />

      <div className="relative z-10">
        <Hero onAssemble={scrollToRegistration} />
        <MissionLog onAssemble={scrollToRegistration} />
        <TheRoster />
        <div ref={registrationRef}>
          <Registration />
        </div>
      </div>
    </div>
  );
}

export default App;
