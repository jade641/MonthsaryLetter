import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FloatingHearts, MusicButton, NextButton, SceneProps, useTypewriter } from './Shared';

const LETTER = `My Love,

Every single day with you feels like a dream I never want to wake up from. From the moment you came into my life, everything became warmer, brighter, and more beautiful.

You are my sunshine on cloudy days, my calm in every storm, and my favorite adventure in this whole wide world.

Every smile you give me, every laugh we share, every quiet moment together I treasure all of it, every single piece. Those little moments may seem ordinary to others, but to me, they are the memories I hold closest to my heart.

You have this incredible way of making even the simplest days feel extraordinary. Just hearing your voice, reading your messages, or seeing your smile is enough to make everything feel okay. No matter how difficult life gets, knowing that I have you gives me strength and peace.

I never imagined that one person could mean so much to me until I met you. You became my safe place, my comfort, my happiness, and the reason I look forward to tomorrow. Loving you has been the easiest and most beautiful thing I've ever done.

Thank you for believing in me, for understanding me even when I can't find the right words, and for loving me through every version of myself. Thank you for your patience, your kindness, your warmth, and for always making me feel that I am enough.

I promise to always choose you not just today, but every single day. I promise to stand beside you during the happiest moments and the hardest ones. I'll celebrate your victories, hold your hand through your struggles, and remind you every day just how amazing and deeply loved you are.

No matter where life takes us, no matter how much time passes, my heart will always find its way back to you. You are my favorite hello, my hardest goodbye, and the greatest blessing I've ever received.

I made this just for you because you deserve to know exactly how deeply and completely you are loved. Every word here comes straight from my heart, but even these words could never fully express how much you truly mean to me.

If I had one wish, it would be to spend every sunrise and every sunset with you. To keep making memories together, to laugh until our stomachs hurt, to support each other's dreams, and to continue writing our story one beautiful chapter at a time.

I don't know what tomorrow holds, but one thing I know for certain is this: as long as I have you, I already have everything I've ever prayed for.

Thank you for being my happiness, my peace, my best friend, and the love of my life.

I love you more than words could ever say, more than any letter could ever explain, and more with every heartbeat that passes.

Forever yours,
With every beat of my heart ❤️`;

function CandleFlame({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* Wax */}
      <div
        style={{
          width: 14,
          height: 60,
          background: 'linear-gradient(to bottom, #fff8dc, #f5e6b0)',
          borderRadius: '4px 4px 2px 2px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      />
      {/* Flame */}
      <motion.div
        style={{
          width: 20,
          height: 32,
          background: 'radial-gradient(ellipse at 50% 80%, #F5C542 0%, #ff8c00 50%, transparent 75%)',
          borderRadius: '50% 50% 40% 40%',
          margin: '-28px auto 0',
          boxShadow: '0 0 18px 8px rgba(245,197,66,0.5)',
          transformOrigin: 'center bottom',
        }}
        animate={{
          scaleX: [1, 1.1, 0.92, 1.05, 1],
          scaleY: [1, 0.95, 1.08, 0.97, 1],
          x: [0, 1.5, -1, 0.8, 0],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: -20,
          left: -20,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,197,66,0.3) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function Scene3({ onNext, muted, onToggleMute }: SceneProps) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { displayText, isDone } = useTypewriter(letterOpen ? LETTER : '', 18, 300);

  // Show button only after letter is fully read (with additional delay)
  useEffect(() => {
    if (isDone && letterOpen) {  // Must be open AND done typing
      const timer = setTimeout(() => setShowButton(true), 1000); // 1 second delay after reading
      return () => clearTimeout(timer);
    } else {
      setShowButton(false); // Hide button if letter closes or not done
    }
  }, [isDone, letterOpen]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #12001f 0%, #220035 60%, #0e001a 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts count={8} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Warm glow behind paper */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,197,66,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-xl">
        <motion.h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#FFD6E8',
            textShadow: '0 0 20px rgba(255,143,171,0.7)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A Letter For You 💌
        </motion.h2>

        {/* Paper card */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.85, rotateZ: -2 }}
          animate={{
            opacity: 1,
            scale: letterOpen ? 1 : 0.95,
            rotateZ: 0,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { delay: 0.5, duration: 0.8 },
            scale: { duration: 0.6 },
            rotateZ: { delay: 0.5, duration: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
          style={{ cursor: letterOpen ? 'default' : 'pointer' }}
          onClick={() => !letterOpen && setLetterOpen(true)}
        >
          {/* Candles */}
          <CandleFlame x={-20} y={40} />
          <CandleFlame x={-14} y={-10} />

          <div style={{ position: 'absolute', right: -20, top: 40 }}>
            <CandleFlame x={0} y={0} />
          </div>
          <div style={{ position: 'absolute', right: -14, top: -10 }}>
            <CandleFlame x={0} y={0} />
          </div>

          {/* Paper */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff9f0 0%, #fef3e2 100%)',
              borderRadius: 16,
              padding: '32px 28px',
              boxShadow: '0 12px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(245,197,66,0.3)',
              minHeight: 340,
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            {!letterOpen ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 48 }}
                >
                  💌
                </motion.div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    color: '#8b5a5a',
                    textAlign: 'center',
                  }}
                >
                  Tap to open your letter...
                </p>
              </div>
            ) : (
              <div>
                <pre
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
                    color: '#3d2525',
                    lineHeight: 1.9,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {displayText}
                  <motion.span
                    animate={{ opacity: isDone ? 0 : [1, 0] }}
                    transition={{ duration: 0.5, repeat: isDone ? 0 : Infinity }}
                  >
                    |
                  </motion.span>
                </pre>
              </div>
            )}
          </div>
        </motion.div>

        {/* Button appears ONLY after letter is fully typed AND 1 second delay */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <NextButton onClick={onNext} label="I want to see more ❤️" delay={0} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
