
import React from 'react';
import { GALLERY_IMAGES } from '../constants';

interface ScrapbookSectionProps {
  onComplete: () => void;
}

const ScrapbookSection: React.FC<ScrapbookSectionProps> = ({ onComplete }) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-32 py-20 px-4">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h2 className="font-romantic text-6xl md:text-8xl text-rose-300 italic text-glow">
          Letters, Dr Sahab.
        </h2>
        <p className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-light">
          A collection of us
        </p>
        <div className="h-px w-24 bg-rose-500/20 mx-auto mt-8" />
      </div>

      {/* Vertical Scrapbook Lane */}
      <div className="w-full space-y-40">
        {GALLERY_IMAGES.map((img, idx) => {
          // Staggered alignments
          const align = idx % 3 === 0 ? 'justify-start' : idx % 3 === 1 ? 'justify-center' : 'justify-end';
          const rotate = idx % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]';
          const margin = idx % 3 === 0 ? 'md:ml-12' : idx % 3 === 2 ? 'md:mr-12' : '';

          return (
            <div 
              key={idx} 
              className={`flex w-full ${align} animate-in fade-in slide-in-from-bottom-20 duration-1000`}
              style={{ animationDelay: `${idx * 150}ms`, transitionDelay: `${idx * 150}ms` }}
            >
              <div className={`group relative max-w-[90%] md:max-w-[70%] ${rotate} ${margin}`}>
                {/* Photo frame */}
                <div className="glass p-3 md:p-6 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-0">
                  <img 
                    src={img.url} 
                    alt={img.caption}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                    loading="lazy"
                  />
                  
                  {/* Caption underneath */}
                  <div className="mt-6 text-center space-y-2">
                    <p className="font-serif-elegant italic text-rose-100/90 text-lg md:text-2xl tracking-tight">
                      {img.caption}
                    </p>
                    <div className="h-[1px] w-12 bg-rose-500/30 mx-auto" />
                  </div>
                </div>

                {/* Decorative Heart */}
                <div className="absolute -top-4 -right-4 w-12 h-12 glass rounded-full flex items-center justify-center text-rose-500 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   ❤️
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conclusion Button */}
      <div className="py-40">
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onComplete();
          }}
          className="group relative px-16 py-5 bg-transparent border border-rose-400/20 rounded-full hover:border-rose-400/60 transition-all duration-700 overflow-hidden"
        >
          <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] text-rose-100/60 group-hover:text-rose-100 transition-colors">
            To the End of Time
          </span>
          <div className="absolute inset-0 bg-rose-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
};

export default ScrapbookSection;
