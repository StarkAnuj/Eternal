
import React from 'react';

interface TapToBeginOverlayProps {
  onStart: () => void;
}

const TapToBeginOverlay: React.FC<TapToBeginOverlayProps> = ({ onStart }) => {
  return (
    <div 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer transition-opacity duration-1000"
      onClick={onStart}
    >
      <div className="text-center space-y-6 animate-pulse">
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p className="text-rose-200 uppercase tracking-[0.5em] text-xs font-light">
          Tap to begin the story
        </p>
      </div>
    </div>
  );
};

export default TapToBeginOverlay;
