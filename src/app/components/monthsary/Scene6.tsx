import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingHearts, MusicButton, NextButton, SceneProps } from './Shared';

const BURST_HEARTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  angle: (i / 30) * Math.PI * 2,
  dist: Math.random() * 200 + 80,
  size: Math.random() * 24 + 12,
  delay: Math.random() * 0.4,
}));

export function Scene6({ onNext, muted, onToggleMute }: SceneProps) {
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowMessage(true), 1200);
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #0f001d 0%, #1f0030 55%, #0a0015 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts count={10} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      {/* Ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,197,66,0.12) 0%, rgba(255,143,171,0.08) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ marginTop: opened ? '-10px' : '-80px', transition: 'margin-top 0.8s ease-out', gap: '1.2rem' }}>
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
          {opened ? 'A Gift From My Heart 💛' : 'There is a gift waiting for you 🎁'}
        </motion.h2>

        {/* Gift Box */}
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 240 }}>
          {/* Heart burst */}
          <AnimatePresence>
            {opened &&
              BURST_HEARTS.map(h => (
                <motion.div
                  key={h.id}
                  className="absolute pointer-events-none select-none"
                  style={{ fontSize: h.size, left: '50%', top: '50%', zIndex: 20 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                  animate={{
                    x: Math.cos(h.angle) * h.dist,
                    y: Math.sin(h.angle) * h.dist,
                    opacity: 0,
                    scale: 1.4,
                  }}
                  transition={{ duration: 1.2, delay: h.delay, ease: 'easeOut' }}
                >
                  ❤️
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Photo that pops out of the box */}
          <AnimatePresence>
            {opened && (
              <motion.div
                style={{
                  position: 'absolute',
                  width: 325,
                  height: 487,
                  top: 10,
                  left: '50%',
                  zIndex: 25,
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,143,171,0.4)',
                  border: '4px solid rgba(255,143,171,0.6)',
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  y: -50,
                  x: '-50%',
                  rotateZ: -15,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  x: '-50%',
                  rotateZ: 0,
                }}
                transition={{ 
                  delay: 0.6, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <img
                  src="/Suprise/IMG_3050.jpeg"
                  alt="Gift"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
                {/* Photo frame glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: 20,
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,143,171,0.4)',
                      '0 0 40px rgba(255,143,171,0.7)',
                      '0 0 20px rgba(255,143,171,0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Box lid */}
          <motion.div
            className="absolute"
            style={{
              width: 200,
              height: 55,
              top: 110,
              left: 10,
              background: 'linear-gradient(135deg, #FF8FAB, #cc5577)',
              borderRadius: '10px 10px 4px 4px',
              transformOrigin: 'bottom left',
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 20px rgba(255,143,171,0.4)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{
              rotateZ: opened ? -95 : 0,
              x: opened ? -80 : 0,
              y: opened ? 60 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Ribbon on lid */}
            <div
              style={{
                width: 18,
                height: '100%',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: 4,
              }}
            />
          </motion.div>

          {/* Box body */}
          <motion.div
            style={{
              position: 'absolute',
              width: 200,
              height: 180,
              top: 165,
              left: 10,
              background: 'linear-gradient(160deg, #e8607a, #c04060)',
              borderRadius: '4px 4px 14px 14px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 40px rgba(255,143,171,0.3)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{
              boxShadow: [
                '0 12px 40px rgba(0,0,0,0.4), 0 0 40px rgba(255,143,171,0.3)',
                '0 12px 40px rgba(0,0,0,0.4), 0 0 70px rgba(255,143,171,0.6)',
                '0 12px 40px rgba(0,0,0,0.4), 0 0 40px rgba(255,143,171,0.3)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ribbon vertical */}
            <div
              style={{
                position: 'absolute',
                width: 18,
                height: '100%',
                background: 'rgba(255,255,255,0.3)',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </motion.div>

          {/* Click indicator */}
          {!opened && (
            <motion.div
              className="absolute -bottom-10 left-0 right-0 text-center"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p style={{ fontFamily: "'Lato', sans-serif", color: '#FF8FAB', fontSize: '0.85rem' }}>
                Click to open 🎁
              </p>
            </motion.div>
          )}
        </div>

        {/* Clickable overlay */}
        {!opened && (
          <div
            className="absolute cursor-pointer"
            style={{ width: 240, height: 280, zIndex: 15, top: '50%', left: '50%', transform: 'translate(-50%, -55%)' }}
            onClick={handleOpen}
          />
        )}

        {/* Revealed message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="w-full max-w-sm"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,143,171,0.3)',
                borderRadius: 20,
                padding: '24px 28px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                marginTop: '250px',
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
            >
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                  color: 'white',
                  lineHeight: 1.7,
                  textAlign: 'center',
                  textShadow: '0 0 16px rgba(255,143,171,0.5)',
                }}
              >
                "My heart is the gift — and it's been yours from the very beginning. ❤️"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <NextButton onClick={onNext} label="One final surprise ✨" delay={0} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
