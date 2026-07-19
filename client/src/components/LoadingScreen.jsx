import { useState, useEffect, useRef } from 'react';

export default function LoadingScreen({ isLoading, onFinish }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);
  const startTime = useRef(Date.now());
  const MIN_DISPLAY_MS = 2200;

  useEffect(() => {
    if (!isLoading) {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 700);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onFinish]);

  // Canvas particle animation
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        r: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.3,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Subtle light radial gradient in center
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.offsetWidth * 0.4);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.04)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
    }

    function loop() {
      drawParticles();
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => cancelAnimationFrame(animId);
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'linear-gradient(160deg, #0a0a0f 0%, #14141e 40%, #1a1a2e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.7s ease-out',
      fontFamily: "'Playfair Display', 'Inter', serif",
      overflow: 'hidden',
    }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative top line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>

        {/* Devas logo */}
        <div style={{
          width: '64px',
          height: '64px',
          position: 'relative',
          animation: 'lsPulse 2s ease-in-out infinite',
        }}>
          <img src="/tooth.png" alt="Devas Dental Clinic" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            margin: 0,
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 600,
            color: '#f0ece4',
            letterSpacing: '0.08em',
          }}>
            Devas{' '}
            <span style={{ color: '#d4af37' }}>Dental Clinic.</span>
          </h1>
          <p style={{
            margin: '10px 0 0',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: 'rgba(240,236,228,0.45)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}>
            Your Smile, Our Passion
          </p>
        </div>

        {/* Progress bar — elegant thin line */}
        <div style={{
          width: 'clamp(120px, 20vw, 220px)',
          height: '1px',
          background: 'rgba(240,236,228,0.1)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
        }}>
          <div style={{
            height: '100%',
            width: '40%',
            background: 'linear-gradient(90deg, rgba(212,175,55,0.1), rgba(212,175,55,0.8), rgba(212,175,55,0.1))',
            borderRadius: '2px',
            position: 'absolute',
            left: 0,
            animation: 'lsProgress 1.8s ease-in-out infinite',
          }} />
        </div>

        {/* Subtle loading dots */}
        <div style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#d4af37',
              opacity: 0.3,
              animation: `lsDotFade 1.4s ease-in-out ${i * 0.3}s infinite`,
            }} />
          ))}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
      }} />

      {/* Keyframes injection */}
      <style>{`
        @keyframes lsPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes lsProgress {
          0% { left: -40%; }
          100% { left: 100%; }
        }
        @keyframes lsDotFade {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}