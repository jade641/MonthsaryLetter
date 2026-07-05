import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MusicButton, NextButton, SceneProps } from './Shared';

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 0.8,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 6,
}));

const LANTERNS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 8 + i * 12,
  delay: i * 1.2,
  duration: 12 + Math.random() * 6,
  sway: (Math.random() - 0.5) * 30,
}));

// Heart constellation points
const CONSTELLATIONS = [
  // Left heart
  [
    { x: 25, y: 45 }, { x: 28, y: 42 }, { x: 32, y: 41 }, { x: 35, y: 43 },
    { x: 33, y: 47 }, { x: 29, y: 52 }, { x: 25, y: 57 }, { x: 21, y: 52 },
    { x: 18, y: 47 }, { x: 18, y: 43 }, { x: 21, y: 41 }, { x: 25, y: 42 },
  ],
  // Right heart
  [
    { x: 68, y: 30 }, { x: 71, y: 27 }, { x: 75, y: 26 }, { x: 78, y: 28 },
    { x: 76, y: 32 }, { x: 72, y: 37 }, { x: 68, y: 41 }, { x: 64, y: 37 },
    { x: 61, y: 32 }, { x: 61, y: 28 }, { x: 64, y: 26 }, { x: 68, y: 27 },
  ],
];

export function Scene7({ onNext, muted, onToggleMute }: SceneProps) {
  const [constellationVisible, setConstellationVisible] = useState(false);

  // Show constellations after 2s
  useEffect(() => {
    const t = setTimeout(() => setConstellationVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020010 0%, #050525 40%, #0a0a35 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{
          top: '8%',
          right: '12%',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fffde0, #f5e878)',
          boxShadow: '0 0 40px rgba(245,232,120,0.6), 0 0 90px rgba(245,232,120,0.3)',
        }}
        animate={{
          boxShadow: [
            '0 0 40px rgba(245,232,120,0.6), 0 0 90px rgba(245,232,120,0.3)',
            '0 0 60px rgba(245,232,120,0.9), 0 0 120px rgba(245,232,120,0.4)',
            '0 0 40px rgba(245,232,120,0.6), 0 0 90px rgba(245,232,120,0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
      />

      {/* Floating lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {LANTERNS.map(l => (
          <motion.div
            key={l.id}
            className="absolute"
            style={{ left: `${l.x}%`, bottom: '-80px' }}
            animate={{
              y: [0, '-115vh'],
              x: [0, l.sway, -l.sway / 2, 0],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'linear' }}
          >
            {/* Lantern body */}
            <div
              style={{
                width: 28,
                height: 40,
                background: 'radial-gradient(ellipse at 50% 40%, rgba(245,197,66,0.95), rgba(220,150,30,0.8))',
                borderRadius: '40%',
                boxShadow: '0 0 20px rgba(245,197,66,0.7), 0 0 40px rgba(245,197,66,0.3)',
                position: 'relative',
              }}
            >
              {/* Inner glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '20%',
                  borderRadius: '50%',
                  background: 'rgba(255,255,200,0.5)',
                  filter: 'blur(4px)',
                }}
              />
            </div>
            {/* Thread */}
            <div
              style={{
                width: 1,
                height: 12,
                background: 'rgba(245,197,66,0.5)',
                margin: '0 auto',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Heart constellations (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
        <defs>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {CONSTELLATIONS.map((points, ci) =>
          points.map((point, pi) => (
            <motion.circle
              key={`${ci}-${pi}`}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="3"
              fill="#FF8FAB"
              filter="url(#starGlow)"
              initial={{ opacity: 0 }}
              animate={constellationVisible ? { opacity: [0.2, 1, 0.4] } : { opacity: 0 }}
              transition={{
                delay: ci * 1.5 + pi * 0.15,
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))
        )}
        {CONSTELLATIONS.map((points, ci) =>
          points.map((point, pi) => {
            const next = points[(pi + 1) % points.length];
            return (
              <motion.line
                key={`line-${ci}-${pi}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="rgba(255,143,171,0.45)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={constellationVisible ? { opacity: [0, 0.6, 0.3] } : { opacity: 0 }}
                transition={{
                  delay: ci * 1.5 + pi * 0.15 + 0.3,
                  duration: 0.5,
                  opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            );
          })
        )}
      </svg>

      {/* Center text */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              color: 'white',
              textShadow: '0 0 24px rgba(255,143,171,0.7), 0 0 60px rgba(255,143,171,0.3)',
            }}
          >
            Under the Same Stars
          </h2>
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1rem, 2.8vw, 1.5rem)',
              color: '#E9D5FF',
              marginTop: 12,
              textShadow: '0 0 16px rgba(233,213,255,0.5)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Every star up there whispers your name...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <NextButton onClick={onNext} label="The grand finale ❤️" delay={0} />
        </motion.div>
      </div>
    </motion.div>
  );
}
