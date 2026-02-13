
import React, { useState, useEffect, useRef } from 'react';
import { AppStep } from './types';
import { ROMANTIC_MESSAGES, BACKGROUND_VIDEO_URL, BACKGROUND_MUSIC_URL } from './constants';
import LandingSection from './components/LandingSection';
import MessageFlow from './components/MessageFlow';
import ProposalSection from './components/ProposalSection';
import ScrapbookSection from './components/ScrapbookSection';
import InevitableSection from './components/InevitableSection';
import MusicToggle from './components/MusicToggle';
import BackgroundHearts from './components/BackgroundHearts';
import TapToBeginOverlay from './components/TapToBeginOverlay';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleAccepted = () => {
    if (audioRef.current) {
      const originalVol = audioRef.current.volume;
      audioRef.current.volume = Math.min(originalVol + 0.15, 1.0);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.volume = originalVol;
      }, 2000);
    }
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(AppStep.GALLERY);
    }, 4500);
  };

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log(e));
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 150);
      setIsPlaying(true);
    }
    setShowOverlay(false);
  };

  // Allow scrolling in the Gallery step, lock it otherwise for cinematic feel
  useEffect(() => {
    if (currentStep === AppStep.GALLERY) {
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
    } else {
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-[3000ms] text-white selection:bg-rose-500/30 ${currentStep === AppStep.INEVITABLE ? 'bg-black' : 'bg-[#0a0004]'}`}>
      {showOverlay && <TapToBeginOverlay onStart={startExperience} />}
      
      <MusicToggle isPlaying={isPlaying} onToggle={() => {
        if (audioRef.current) {
          if (isPlaying) audioRef.current.pause();
          else audioRef.current.play();
          setIsPlaying(!isPlaying);
        }
      }} />
      
      <div className="vignette" />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-out"
          style={{ transform: `scale(1.05) translate(${parallax.x}px, ${parallax.y}px)` }}
        >
          {currentStep === AppStep.LANDING ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40" src={BACKGROUND_VIDEO_URL} />
          ) : currentStep !== AppStep.INEVITABLE ? (
            <div className="w-full h-full bg-gradient-to-br from-[#0f0006] via-[#2d0010] to-[#0a0004]">
              <BackgroundHearts />
            </div>
          ) : null}
        </div>
      </div>

      <main className={`relative z-50 w-full min-h-screen flex flex-col items-center justify-center p-4`}>
        <div className={`w-full flex flex-col items-center justify-center fade-entrance ${currentStep === AppStep.GALLERY ? 'py-12' : ''}`} key={currentStep}>
          {currentStep === AppStep.LANDING && (
            <LandingSection onBegin={() => setCurrentStep(AppStep.STORY)} />
          )}

          {currentStep === AppStep.STORY && (
            <MessageFlow messages={ROMANTIC_MESSAGES} onComplete={() => setCurrentStep(AppStep.PROPOSAL)} />
          )}

          {currentStep === AppStep.PROPOSAL && (
            <ProposalSection onAccept={handleAccepted} />
          )}

          {currentStep === AppStep.GALLERY && (
            <ScrapbookSection onComplete={() => setCurrentStep(AppStep.INEVITABLE)} />
          )}

          {currentStep === AppStep.INEVITABLE && (
            <InevitableSection />
          )}
        </div>
      </main>

      <div className="fixed top-0 left-0 h-[3px] bg-rose-500/40 transition-all duration-1000 z-[60] ease-out" 
           style={{ width: `${((Object.values(AppStep).indexOf(currentStep) + 1) / Object.keys(AppStep).length) * 100}%` }} />
           
      <footer className="fixed bottom-6 left-0 w-full text-center text-[9px] opacity-20 font-light tracking-[0.5em] uppercase pointer-events-none z-[60]">
        Our Eternal Story
      </footer>
    </div>
  );
};

export default App;
