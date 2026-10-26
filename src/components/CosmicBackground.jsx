import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars & floating heart dust
    const starsCount = 120;
    const stars = [];

    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: ['#ffffff', '#ff8fab', '#ffe5ec', '#fcd34d', '#c084fc'][
          Math.floor(Math.random() * 5)
        ],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15
      });
    }

    // Floating heart embers
    const embers = [];
    const emberCount = 25;
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 4,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: Math.sin(Math.random() * Math.PI) * 0.3,
        sway: Math.random() * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    // Cursor sparkles
    const sparkles = [];
    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          alpha: 1,
          color: Math.random() > 0.5 ? '#ff8fab' : '#fcd34d',
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Render Embers (floating heart petals)
      embers.forEach((ember) => {
        ember.y -= ember.speedY;
        ember.sway += ember.swaySpeed;
        ember.x += Math.sin(ember.sway) * 0.4;

        if (ember.y < -20) {
          ember.y = height + 20;
          ember.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(ember.x, ember.y);
        ctx.globalAlpha = ember.alpha;
        ctx.fillStyle = '#ff4d79';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff3366';

        // Draw small heart
        const s = ember.size / 15;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5 * s, -10 * s, -15 * s, -5 * s, -15 * s, 5 * s);
        ctx.bezierCurveTo(-15 * s, 15 * s, 0, 20 * s, 0, 25 * s);
        ctx.bezierCurveTo(0, 20 * s, 15 * s, 15 * s, 15 * s, 5 * s);
        ctx.bezierCurveTo(15 * s, -5 * s, 5 * s, -10 * s, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      // Render cursor sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.025;

        if (sp.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sp.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="ambient-glow ambient-glow-rose" />
      <div className="ambient-glow ambient-glow-purple" />
      <div className="ambient-glow ambient-glow-gold" />
    </>
  );
}
