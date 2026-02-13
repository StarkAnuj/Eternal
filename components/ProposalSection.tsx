
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ProposalSectionProps {
  onAccept: () => void;
}

const CHAOS_MESSAGES: Record<number, string> = {
  2: "Hothead 😒",
  4: "Stubborn child",
  6: "Buddhu",
  8: "That's rude babe.",
  10: "Okay okay, I admire the effort.",
  12: "Persistent. That’s why I chose you.",
  14: "Never listening to me",
  16: "You can't choose that option!",
  18: "You're mine 😏",
  20: "Icse Chick.",
  21:"Always us.",
  22:"Still mine.",
  23:"Forever maroon.",
  24:"You knew.",
  25:"Buddhu.",
  26:"Hothead 😒.",
  27:"Now click the right button.",
  28:"Why no 🥺.",
  29:"Am i not your sweet boy?.",
  30:"Doc stop!."
};

const ProposalSection: React.FC<ProposalSectionProps> = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [noInteractions, setNoInteractions] = useState(0);
  const [teaseMessage, setTeaseMessage] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const holdIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    setIsHolding(true);
    const step = 100 / (1.5 * 60); // 1.5s at ~60fps
    holdIntervalRef.current = window.setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          handleAccept();
          return 100;
        }
        return prev + step;
      });
    }, 1000 / 60);
  };

  const endHold = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHoldProgress(0);
  };

  const handleAccept = () => {
    if (accepted) return;
    setAccepted(true);
    setIsHolding(false);
    setHoldProgress(100);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff', '#ffd700']
    });
    onAccept();
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (accepted) return;
    const nextCount = noInteractions + 1;
    setNoInteractions(nextCount);

    // Escape visual
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'heart-burst';
    burst.innerHTML = '❤️';
    burst.style.left = `${rect.left + rect.width / 2}px`;
    burst.style.top = `${rect.top + rect.height / 2}px`;
    containerRef.current?.appendChild(burst);
    setTimeout(() => burst.remove(), 800);

    // Runaway logic
    const moveRange = Math.min(100 + nextCount * 15, 250);
    const randomX = (Math.random() - 0.5) * moveRange;
    const randomY = (Math.random() - 0.5) * moveRange;
    setNoButtonStyle({
      transform: `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.7, 1 - nextCount * 0.02)})`,
      transition: `all 0.3s var(--cinematic-ease)`,
      position: 'relative'
    });

    // Precise Chaos Messages
    if (CHAOS_MESSAGES[nextCount]) {
      setTeaseMessage(CHAOS_MESSAGES[nextCount]);
      setTimeout(() => setTeaseMessage(null), 3000);
    }
  };

  return (
    <div ref={containerRef} className="relative text-center w-full max-w-2xl px-4 flex flex-col items-center">
      {teaseMessage && (
        <div className="absolute top-0 -translate-y-24 z-50">
          <div className="glass px-6 py-2 rounded-full border border-rose-400/30 shadow-xl animate-float-pill">
            <span className="text-rose-100 text-sm font-medium tracking-wide">{teaseMessage}</span>
          </div>
        </div>
      )}

      {!accepted ? (
        <div className="space-y-16">
          <h2 className="font-serif-elegant text-5xl md:text-7xl italic text-stone-50 leading-tight text-glow">
            Forever<br/> <span className="text-rose-300 font-bold">Maroon?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[140px]">
            {/* Hold-to-Confirm YES */}
            <div className="relative group">
              <button 
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className={`relative px-16 py-6 bg-rose-700 text-white font-bold rounded-full overflow-hidden transition-all duration-300 active:scale-95 text-lg uppercase tracking-[0.2em] shadow-lg ${isHolding ? 'heart-beat' : ''}`}
              >
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-rose-500 transition-all ease-linear"
                  style={{ width: `${holdProgress}%`, opacity: holdProgress > 0 ? 0.6 : 0 }}
                />
                <span className="relative z-10">Yes</span>
              </button>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-40 transition-opacity whitespace-nowrap text-[10px] tracking-[0.3em] uppercase">
                Hold to confirm
              </div>
            </div>

            <button 
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              style={noButtonStyle}
              className="px-10 py-4 bg-rose-400/10 backdrop-blur-xl border-2 border-rose-300/40 text-rose-100 font-semibold rounded-full transition-all text-xs uppercase tracking-[0.3em]"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <h2 className="font-romantic text-7xl md:text-8xl text-rose-300 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Proud of you 😊🥰 You'll get Kisses 😘
          </h2>
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-1000  fill-mode-forwards opacity-0">
             <p className="text-stone-300 text-sm uppercase tracking-[0.5em] font-light opacity-60">
                
             </p>
             <div className="h-px w-12 bg-rose-500/20 mx-auto mt-8" />
             <p className="font-serif-elegant italic text-rose-200/80 text-lg tracking-tight text-glow animate-pulse">
                
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalSection;
