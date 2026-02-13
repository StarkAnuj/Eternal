
import React, { useEffect, useRef } from 'react';

const InevitableSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: any[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0) s.speed = -s.speed;
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 text-center space-y-12 max-w-4xl px-8">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-[3000ms] ease-out">
          <p className="font-serif-elegant italic text-3xl md:text-5xl text-stone-100 leading-relaxed text-glow">
            “In every universe,<br/>
            in every lifetime,<br/>
            in every version of us —<br/>
            <span className="text-rose-300 font-romantic text-4xl md:text-6xl not-italic ml-2">I’d still choose you.</span>”
          </p>
        </div>
        <div className="pt-20 opacity-0 animate-in fade-in duration-[4000ms] delay-2000 fill-mode-forwards">
          <div className="h-px w-24 bg-rose-500/20 mx-auto" />
          <p className="mt-8 text-[10px] uppercase tracking-[0.8em] text-white/20 font-light">
            Ours, Always.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InevitableSection;
