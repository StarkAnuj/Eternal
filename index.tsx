
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Refined Heart Sparkle Logic
const initSparkles = () => {
  const canvas = document.getElementById('sparkles') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let particles: any[] = [];
  const colors = ['#FFC0CB', '#FF69B4', '#FFF5EE', '#FFD700'];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    // Reduced frequency from 0.3 to 0.1 to prevent "clumping"
    if (Math.random() > 0.85) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        rotation: Math.random() * 360
      });
    }
  });

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
    ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.fill();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.4; // Lowered opacity for better visibility of content
      drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
      ctx.restore();

      p.x += p.speedX;
      p.y += p.speedY;
      p.life -= 0.02; // Faster fade out to prevent screen saturation
      p.rotation += 1;

      if (p.life <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  };
  animate();
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  initSparkles();
}
