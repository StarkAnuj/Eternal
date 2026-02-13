
import React from 'react';

interface LandingSectionProps {
  onBegin: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onBegin }) => {
  return (
    <div className="text-center space-y-8 fade-in">
      <h1 className="font-serif-elegant text-4xl md:text-7xl font-light tracking-tight leading-tight max-w-4xl mx-auto italic">
        For the girl who turned me <span className="text-rose-400">into</span> a <span className="text-rose-300 font-romantic">Poet</span>.
      </h1>
      <button 
        onClick={onBegin}
        className="group relative px-10 py-4 bg-transparent text-white font-medium tracking-widest uppercase text-sm border border-rose-400/50 rounded-full overflow-hidden transition-all duration-500 hover:border-rose-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]"
      >
        <span className="relative z-10 transition-colors group-hover:text-white">Begin Our Journey</span>
        <div className="absolute inset-0 bg-rose-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </button>
    </div>
  );
};

export default LandingSection;
