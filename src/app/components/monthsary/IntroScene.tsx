import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingHearts, StarField, Sparkles, MusicButton, useTypewriter } from './Shared';

interface IntroSceneProps {
  onNext: () => void;
  muted: boolean;
  onToggleMute: () => void;
  onStart: () => void;
}

export function IntroScene({ onNext, muted, onToggleMute, onStart }: IntroSceneProps) {
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { displayText, isDone } = useTypewriter(
    "Someone has prepared something special for you ❤️",
    55,
    800,
  );

  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(t);
    }
  }, [isDone]);

  const [burstHearts] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i / 24) * Math.PI * 2,
      dist: Math.random() * 300 + 100,
      size: Math.random() * 20 + 12,
    }))
  );

  function handleOpen() {
    console.log('🎯 Open button clicked!');
    onStart(); // This triggers the music
    
    // Force play music with user gesture
    setTimeout(() => {
      const audioElements = document.getElementsByTagName('audio');
      console.log(`Found ${audioElements.length} audio elements`);
      for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].play().then(() => {
          console.log(`✅ Manually started audio ${i}`);
        }).catch(e => {
          console.log(`⚠️ Could not start audio ${i}:`, e.message);
        });
      }
    }, 100);
    
    setExiting(true);
    setTimeout(onNext, 1300);
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #0d0015 0%, #1a0033 55%, #0a0020 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: exiting ? 1.08 : 1 }}
      exit={{ opacity: 0, scale: 1.18 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <StarField count={110} moving />
      <Sparkles count={28} />
      <FloatingHearts count={14} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Soft radial glow behind text */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,143,171,0.18) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="min-h-[120px] flex items-center justify-center"
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 3.8vw, 2.4rem)',
              color: 'white',
              textShadow: '0 0 28px rgba(255,143,171,0.85), 0 0 60px rgba(255,143,171,0.4)',
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: isDone ? 0 : [1, 0] }}
              transition={{ duration: 0.6, repeat: isDone ? 0 : Infinity }}
              style={{ display: 'inline-block', marginLeft: 2 }}
            >
              |
            </motion.span>
          </h1>
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.button
              key="open"
              onClick={handleOpen}
              className="cursor-pointer select-none"
              style={{
                padding: '18px 48px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, rgba(255,143,171,0.75) 0%, rgba(233,213,255,0.75) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.4)',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: 'white',
                letterSpacing: '0.03em',
              }}
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
                boxShadow: [
                  '0 8px 36px rgba(255,143,171,0.55)',
                  '0 14px 56px rgba(255,143,171,0.85)',
                  '0 8px 36px rgba(255,143,171,0.55)',
                ],
              }}
              transition={{
                opacity: { duration: 0.7 },
                scale: { duration: 0.7, type: 'spring', stiffness: 200 },
                y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.12, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              Open My Surprise ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Heart burst on click */}
      <AnimatePresence>
        {exiting &&
          burstHearts.map(h => (
            <motion.div
              key={h.id}
              className="fixed pointer-events-none select-none"
              style={{
                left: '50%',
                top: '50%',
                fontSize: h.size,
                zIndex: 20,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{
                x: Math.cos(h.angle) * h.dist,
                y: Math.sin(h.angle) * h.dist,
                opacity: 0,
                scale: 1.5,
              }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            >
              ❤️
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
}
