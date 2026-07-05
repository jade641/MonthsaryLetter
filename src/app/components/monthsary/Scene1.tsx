import { motion } from 'motion/react';
import { FallingPetals, FloatingHearts, MusicButton, NextButton, SceneProps } from './Shared';

const GREETING = ['H', 'i', ' ', 'L', 'o', 'v', 'e', ' ', '❤️'];

export function Scene1({ onNext, muted, onToggleMute }: SceneProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #1a0028 0%, #2e0045 55%, #170022 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.9 }}
    >
      <FallingPetals count={28} />
      <FloatingHearts count={12} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Soft center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,143,171,0.14) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center px-6">
        {/* Letter-by-letter "Hi Love ❤️" */}
        <div className="flex flex-wrap justify-center" aria-label="Hi Love">
          {GREETING.map((char, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                color: 'white',
                textShadow: '0 0 30px rgba(255,143,171,0.9), 0 0 60px rgba(255,143,171,0.4)',
                display: 'inline-block',
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 18,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
            color: '#FFD6E8',
            textShadow: '0 0 20px rgba(255,143,171,0.6)',
            fontStyle: 'italic',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.4 }}
        >
          I made something just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <NextButton onClick={onNext} label="Let me see ❤️" delay={3.5} />
        </motion.div>
      </div>
    </motion.div>
  );
}
