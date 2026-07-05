import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FloatingHearts, FallingPetals, StarField, MusicButton } from './Shared';

const FINAL_LINES = [
  { text: 'Happy Monthsary ❤️', isTitle: true },
  { text: 'Thank you for staying with me.', isTitle: false },
  { text: 'Thank you for loving me.', isTitle: false },
  { text: 'Thank you for making every day special.', isTitle: false },
  { text: '', isTitle: false },
  { text: 'No matter what happens,', isTitle: false },
  { text: "I'll always choose you.", isTitle: false },
  { text: '', isTitle: false },
  { text: 'I love you today,', isTitle: false },
  { text: 'tomorrow,', isTitle: false },
  { text: 'and always.', isTitle: false },
  { text: '', isTitle: false },
  { text: '❤️ Happy Monthsary, Love ❤️', isTitle: true },
];

const FIREWORK_COLORS = ['#FFD6E8', '#FF8FAB', '#E9D5FF', '#F5C542', '#ffffff'];

interface FinalSceneProps {
  muted: boolean;
  onToggleMute: () => void;
}

export function FinalScene({ muted, onToggleMute }: FinalSceneProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [phase, setPhase] = useState<'lines' | 'ending'>('lines');
  const fireworksRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [fadingOut, setFadingOut] = useState(false);

  // Reveal lines one by one
  useEffect(() => {
    let lineIdx = 0;
    const reveal = () => {
      if (lineIdx < FINAL_LINES.length) {
        setVisibleLines(prev => [...prev, lineIdx]);
        lineIdx++;
        setTimeout(reveal, FINAL_LINES[lineIdx - 1]?.text === '' ? 400 : 900);
      } else {
        setTimeout(() => setPhase('ending'), 1500);
      }
    };
    const t = setTimeout(reveal, 800);
    return () => clearTimeout(t);
  }, []);

  // Confetti bursts
  useEffect(() => {
    if (phase !== 'lines') return;
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        colors: FIREWORK_COLORS,
        origin: { x: Math.random(), y: 0.2 },
        gravity: 0.9,
        scalar: 0.9,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  // Fireworks in ending phase
  useEffect(() => {
    if (phase !== 'ending') return;

    const burst = () => {
      confetti({
        particleCount: 60,
        angle: 55,
        spread: 60,
        origin: { x: 0.05, y: 0.6 },
        colors: FIREWORK_COLORS,
        shapes: ['star', 'circle'],
      });
      confetti({
        particleCount: 60,
        angle: 125,
        spread: 60,
        origin: { x: 0.95, y: 0.6 },
        colors: FIREWORK_COLORS,
        shapes: ['star', 'circle'],
      });
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors: FIREWORK_COLORS,
        startVelocity: 35,
      });
    };

    burst();
    fireworksRef.current = setInterval(burst, 2500);

    // Fade to black after 12s
    const fadeT = setTimeout(() => {
      setFadingOut(true);
      clearInterval(fireworksRef.current!);
    }, 12000);

    return () => {
      clearInterval(fireworksRef.current!);
      clearTimeout(fadeT);
    };
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(140deg, #0a0018 0%, #1a002e 55%, #080012 100%)', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: fadingOut ? 4 : 0.9 }}
    >
      <StarField count={80} moving />
      <FloatingHearts count={18} />
      <FallingPetals count={20} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Radial glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,143,171,0.2) 0%, rgba(233,213,255,0.1) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {phase === 'lines' && (
          <motion.div
            key="lines"
            className="relative z-10 flex flex-col items-center gap-3 text-center px-6 max-w-lg w-full py-8"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            style={{ maxHeight: '85vh', overflowY: 'hidden' }}
          >
            {FINAL_LINES.map((line, i) => (
              <AnimatePresence key={i}>
                {visibleLines.includes(i) && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{
                      fontFamily: line.isTitle ? "'Playfair Display', serif" : "'Dancing Script', cursive",
                      fontSize: line.isTitle
                        ? 'clamp(1.6rem, 5vw, 2.8rem)'
                        : line.text === ''
                          ? '0.5rem'
                          : 'clamp(1rem, 3vw, 1.4rem)',
                      color: line.isTitle ? '#FFD6E8' : 'rgba(255,255,255,0.88)',
                      textShadow: line.isTitle
                        ? '0 0 28px rgba(255,143,171,0.9), 0 0 60px rgba(255,143,171,0.4)'
                        : '0 0 14px rgba(255,143,171,0.4)',
                      lineHeight: 1.5,
                      fontWeight: line.isTitle ? 700 : 400,
                    }}
                  >
                    {line.text || ' '}
                  </motion.p>
                )}
              </AnimatePresence>
            ))}
          </motion.div>
        )}

        {phase === 'ending' && (
          <motion.div
            key="ending"
            className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          >
            {/* Beating Heart */}
            <motion.div
              style={{ fontSize: 'clamp(5rem, 18vw, 10rem)', lineHeight: 1 }}
              animate={{
                scale: [1, 1.18, 1, 1.18, 1],
                filter: [
                  'drop-shadow(0 0 20px rgba(255,143,171,0.6))',
                  'drop-shadow(0 0 50px rgba(255,143,171,1))',
                  'drop-shadow(0 0 20px rgba(255,143,171,0.6))',
                  'drop-shadow(0 0 50px rgba(255,143,171,1))',
                  'drop-shadow(0 0 20px rgba(255,143,171,0.6))',
                ],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.div>

            {/* Sparkles around heart */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const r = 90;
              return (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{
                    fontSize: 16 + Math.random() * 10,
                    color: '#F5C542',
                    left: '50%',
                    top: '28%',
                  }}
                  animate={{
                    x: Math.cos(angle) * r,
                    y: Math.sin(angle) * r,
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                    scale: [0.5, 1.3, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ✦
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  color: 'white',
                  textShadow: '0 0 30px rgba(255,143,171,0.9), 0 0 70px rgba(255,143,171,0.4)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                Forever & Always ❤️
              </h1>
            </motion.div>

            <motion.p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
                color: '#FFD6E8',
                textShadow: '0 0 16px rgba(255,143,171,0.6)',
                maxWidth: 380,
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              The stars will keep shining, and my love for you will keep growing — endlessly, beautifully, always.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stars visible during fade */}
      {fadingOut && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <StarField count={60} />
        </motion.div>
      )}
    </motion.div>
  );
}
