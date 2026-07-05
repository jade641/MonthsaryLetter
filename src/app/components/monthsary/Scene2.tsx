import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingHearts, MusicButton, NextButton, SceneProps } from './Shared';

const PHOTOS = [
  {
    url: '/pictures/IMG_0224.jpeg',
    caption: 'Our first memories...',
  },
  {
    url: '/pictures/IMG_0934.jpeg',
    caption: 'Every moment is a treasure...',
  },
  {
    url: '/pictures/20240812182135355.jpg',
    caption: 'Our happiest moments...',
  },
  {
    url: '/pictures/IMG_3015.jpeg',
    caption: 'Together, always...',
  },
  {
    url: '/pictures/IMG_20240729_204545.jpg',
    caption: 'Every day with you...',
  },
  {
    url: '/pictures/IMG_20240919_183551.jpg',
    caption: 'You are my world...',
  },
  {
    url: '/pictures/IMG_20241031_181100.jpg',
    caption: "I'll always treasure these.",
  },
];

export function Scene2({ onNext, muted, onToggleMute }: SceneProps) {
  const [current, setCurrent] = useState(0);
  const [allSeen, setAllSeen] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(prev => {
        const next = prev + 1;
        setDirection(1);
        if (next >= PHOTOS.length) {
          clearInterval(t);
          setAllSeen(true);
          return prev;
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  function goTo(idx: number) {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    if (idx === PHOTOS.length - 1) setAllSeen(true);
  }

  const photo = PHOTOS[current];

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #0f0020 0%, #1e0038 60%, #0a0018 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts count={8} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 w-full max-w-4xl">
        {/* Title */}
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
          A Gallery of Us 📸
        </motion.h2>

        {/* Photo container */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 24,
            boxShadow: '0 0 60px rgba(255,143,171,0.45), 0 20px 60px rgba(0,0,0,0.5)',
            border: '2px solid rgba(255,143,171,0.4)',
            height: '520px',
            width: '390px',
            margin: '0 auto',
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              className="absolute inset-0"
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60, filter: 'blur(4px)' }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Glow ring pulse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ borderRadius: 22, border: '2px solid rgba(255,143,171,0.6)' }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              color: '#FFD6E8',
              textShadow: '0 0 16px rgba(255,143,171,0.6)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {photo.caption}
          </motion.p>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="flex gap-3 items-center">
          {PHOTOS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full cursor-pointer"
              animate={{
                width: i === current ? 24 : 10,
                height: 10,
                backgroundColor: i === current ? '#FF8FAB' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        <AnimatePresence>
          {allSeen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <NextButton onClick={onNext} label="There's more ❤️" delay={0} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
