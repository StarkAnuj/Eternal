
import React, { useState } from 'react';
import { MessageCard } from '../types';

interface MessageFlowProps {
  messages: MessageCard[];
  onComplete: () => void;
}

const MessageFlow: React.FC<MessageFlowProps> = ({ messages, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (index < messages.length - 1) {
        setIndex(index + 1);
        setIsAnimating(false);
      } else {
        onComplete();
      }
    }, 600);
  };

  const currentMessage = messages[index];

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className={`glass p-8 md:p-12 rounded-3xl text-center shadow-2xl transform transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-rose-500 heart-beat" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <p className="font-romantic text-2xl md:text-3xl text-stone-100 leading-relaxed mb-10 min-h-[120px] flex items-center justify-center">
          {currentMessage.text}
        </p>

        <button 
          onClick={handleNext}
          className="px-8 py-3 bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95"
        >
          {index === messages.length - 1 ? 'Finally...' : 'Continue'}
        </button>
        
        <div className="mt-8 flex justify-center gap-2">
          {messages.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-rose-500' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageFlow;
