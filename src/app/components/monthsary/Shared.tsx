import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

export interface SceneProps {
  onNext: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useTypewriter(text: string, speed = 50, startDelay = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayText, isDone };
}

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) {
      console.log('⚠️ Music already initialized');
      return;
    }
    startedRef.current = true;
    console.log('🎵 Initializing music...');
    
    // Create audio element with Green Day - Last Night on Earth
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5; // 50% volume for Green Day song
    audio.preload = 'auto';
    
    // Set the source to your local file
    audio.src = '/last-night-on-earth.mp3'; // Green Day - Last Night on Earth
    
    audioRef.current = audio;
    
    // Add event listeners for debugging
    audio.addEventListener('canplay', () => {
      console.log('✅ Green Day song loaded and ready to play!');
    });
    
    audio.addEventListener('playing', () => {
      console.log('🎸 Playing: Green Day - Last Night on Earth');
      setIsPlaying(true);
    });
    
    audio.addEventListener('pause', () => {
      console.log('⏸️ Music paused');
      setIsPlaying(false);
    });
    
    audio.addEventListener('error', (e) => {
      console.error('❌ Audio error - Make sure last-night-on-earth.mp3 is in the public folder!');
      console.error('Error details:', e);
      alert('⚠️ Music file not found!\n\nPlease make sure "last-night-on-earth.mp3" is in the public folder.\n\nCheck console (F12) for details.');
    });
    
    const attemptPlay = () => {
      console.log('▶️ Attempting to play Green Day...');
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ SUCCESS! Green Day - Last Night on Earth is now playing! 🎸');
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('⚠️ Autoplay blocked:', error.message);
            console.log('💡 Music will play on next user interaction');
            
            // Add interaction listeners
            const interactions = ['click', 'touchstart', 'keydown'];
            
            const handleInteraction = () => {
              console.log('👆 User interaction detected, starting Green Day...');
              audio.play()
                .then(() => {
                  console.log('✅ Green Day started successfully! 🎸');
                  setIsPlaying(true);
                })
                .catch(e => console.error('Failed to play:', e));
              
              // Remove all listeners after first successful interaction
              interactions.forEach(event => {
                document.removeEventListener(event, handleInteraction);
              });
            };
            
            interactions.forEach(event => {
              document.addEventListener(event, handleInteraction, { once: true });
            });
          });
      }
    };
    
    // Load and play
    audio.load();
    attemptPlay();
    
    // Also try to play after a short delay
    setTimeout(() => {
      if (!isPlaying && audioRef.current) {
        console.log('🔄 Retry playing Green Day...');
        attemptPlay();
      }
    }, 1000);
    
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        console.log(next ? '🔇 Muted' : '🔊 Unmuted');
      }
      return next;
    });
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
        console.log('🧹 Audio cleaned up');
      }
    };
  }, []);

  return { start, toggleMute, muted, isPlaying };
}

// ─── Background Components ─────────────────────────────────────────────────────

export function FloatingHearts({ count = 15, bottom = true }: { count?: number; bottom?: boolean }) {
  const [hearts] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 9,
      opacity: Math.random() * 0.45 + 0.15,
      sway: (Math.random() - 0.5) * 40,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.x}%`,
            [bottom ? 'bottom' : 'top']: '-60px',
            fontSize: h.size,
            opacity: h.opacity,
          }}
          animate={{
            y: bottom ? [0, '-115vh'] : [0, '115vh'],
            x: [0, h.sway, -h.sway / 2, 0],
            opacity: [h.opacity, h.opacity * 0.7, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export function StarField({ count = 90, color = 'white', moving = false }: { count?: number; color?: string; moving?: boolean }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      moveDx: (Math.random() - 0.5) * 0.05,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.8, 1.3, 0.8],
            x: moving ? [0, star.moveDx * 100, 0] : 0,
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function Sparkles({ count = 22 }: { count?: number }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 2.5 + 1,
      delay: Math.random() * 5,
      size: Math.random() * 14 + 7,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {items.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, color: '#F5C542' }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.3, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}

export function FallingPetals({ count = 22 }: { count?: number }) {
  const [petals] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 110 - 5,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 10,
      sway: (Math.random() - 0.5) * 80,
      initRot: Math.random() * 360,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: '-50px', fontSize: p.size }}
          animate={{
            y: ['0px', '115vh'],
            x: [0, p.sway, -p.sway / 2, 0],
            rotate: [p.initRot, p.initRot + 270],
            opacity: [0.9, 0.7, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

// ─── UI Components ─────────────────────────────────────────────────────────────

export function MusicButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 24px rgba(255, 143, 171, 0.3)',
        fontSize: 20,
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
    >
      {muted ? '🔇' : '🎵'}
    </motion.button>
  );
}

export function NextButton({
  onClick,
  label = 'Continue →',
  delay = 0.4,
}: {
  onClick: () => void;
  label?: string;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="px-8 py-4 rounded-full text-white cursor-pointer select-none"
      style={{
        background: 'linear-gradient(135deg, #FF8FAB, #E9D5FF)',
        boxShadow: '0 8px 32px rgba(255,143,171,0.55)',
        border: '1px solid rgba(255,255,255,0.3)',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.08, y: -4, boxShadow: '0 14px 44px rgba(255,143,171,0.75)' }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}

export function GlassCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
