import { useState } from 'react';
import { motion } from 'motion/react';
import { FloatingHearts, MusicButton, NextButton, SceneProps } from './Shared';

const REASONS = [
  "Your smile that lights up any room I'm in",
  "The way you laugh at everything — it's contagious",
  'How you always make me feel safe and loved',
  'Your endless kindness to everyone around you',
  "The way your eyes light up when you're excited",
  'How you always know exactly what to say',
  'Your strength and quiet resilience',
  'The warmth of your hand holding mine',
  'Your silly jokes that always get me',
  'How deeply you care about everything',
  "The way you look at me like I'm your whole world",
  'Simply because you are perfectly, beautifully you ❤️',
];

const CARD_COLORS = [
  'rgba(255,143,171,0.15)',
  'rgba(233,213,255,0.15)',
  'rgba(255,214,232,0.12)',
  'rgba(245,197,66,0.12)',
];

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const bg = CARD_COLORS[index % CARD_COLORS.length];
  const borderColor = ['#FF8FAB', '#E9D5FF', '#FFD6E8', '#F5C542'][index % 4];

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: 800, width: '100%', aspectRatio: '1/1' }}
      onClick={() => setFlipped(f => !f)}
      animate={{ y: [0, -6, 0] }}
      transition={{
        y: { duration: 2.5 + index * 0.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 },
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: bg,
            backdropFilter: 'blur(12px)',
            border: `1.5px solid ${borderColor}50`,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: `0 6px 30px rgba(0,0,0,0.25), 0 0 20px ${borderColor}20`,
          }}
        >
          <motion.span
            style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
          >
            ❤️
          </motion.span>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.7rem',
              color: `${borderColor}cc`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${bg}, rgba(0,0,0,0.1))`,
            backdropFilter: 'blur(14px)',
            border: `1.5px solid ${borderColor}70`,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 12px',
            boxShadow: `0 6px 30px rgba(0,0,0,0.3), 0 0 30px ${borderColor}30`,
          }}
        >
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
              color: 'rgba(255,255,255,0.92)',
              textAlign: 'center',
              lineHeight: 1.5,
              textShadow: `0 0 12px ${borderColor}60`,
            }}
          >
            {reason}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Scene5({ onNext, muted, onToggleMute }: SceneProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #12001f 0%, #240038 60%, #100019 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts count={8} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      <div className="relative z-10 flex flex-col items-center h-full overflow-y-auto py-8 px-4 gap-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              color: '#FFD6E8',
              textShadow: '0 0 20px rgba(255,143,171,0.7)',
            }}
          >
            Reasons Why I Love You ❤️
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: 'rgba(255,214,232,0.55)',
              marginTop: 6,
              fontSize: '0.9rem',
            }}
          >
            Tap each card to read
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-3 w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {REASONS.map((reason, i) => (
            <FlipCard key={i} reason={reason} index={i} />
          ))}
        </motion.div>

        <div className="py-4">
          <NextButton onClick={onNext} label="One more surprise ❤️" delay={0} />
        </div>
      </div>
    </motion.div>
  );
}
