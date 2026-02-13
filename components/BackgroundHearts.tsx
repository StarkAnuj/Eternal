
import React, { useMemo } from 'react';

const BackgroundHearts: React.FC = () => {
  const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${10 + Math.random() * 20}px`
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundHearts;
