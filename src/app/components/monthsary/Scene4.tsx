import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FloatingHearts, MusicButton, NextButton, SceneProps } from './Shared';

const MILESTONES = [
  { date: 'The Very Beginning', label: 'The day our hearts met', emoji: '💫', color: '#FF8FAB' },
  { date: 'First Week', label: 'Getting to know each other — every message felt magical', emoji: '✉️', color: '#E9D5FF' },
  { date: 'First Laugh', label: 'That silly moment that made everything feel real', emoji: '😂', color: '#FFD6E8' },
  { date: 'First Month', label: 'Falling deeper — I knew you were different', emoji: '🌙', color: '#FF8FAB' },
  { date: 'Our First Date', label: 'Nervous hearts, warm smiles, and magic in the air', emoji: '🌹', color: '#F5C542' },
  { date: 'Every Morning', label: "Waking up knowing you're mine — absolute bliss", emoji: '☀️', color: '#FFD6E8' },
  { date: 'Today — Our Monthsary! 🎉', label: 'One month of the most beautiful journey', emoji: '❤️', color: '#FF8FAB' },
];

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof MILESTONES)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex items-start gap-4">
      {/* Line */}
      {!isLast && (
        <motion.div
          className="absolute left-[30px] top-16 w-0.5"
          style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
          initial={{ height: 0 }}
          animate={inView ? { height: 80 } : { height: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
        />
      )}

      {/* Icon bubble */}
      <motion.div
        className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${item.color}40, ${item.color}20)`,
          border: `2px solid ${item.color}80`,
          boxShadow: `0 4px 20px ${item.color}40`,
          fontSize: 26,
          zIndex: 2,
        }}
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.2 + index * 0.12, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {item.emoji}
      </motion.div>

      {/* Card */}
      <motion.div
        className="flex-1 mb-8"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${item.color}50`,
          borderRadius: 16,
          padding: '16px 20px',
          boxShadow: `0 4px 24px rgba(0,0,0,0.25), 0 0 20px ${item.color}15`,
        }}
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -40, y: 20 }}
        transition={{ delay: 0.3 + index * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            color: item.color,
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          {item.date}
        </p>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
          }}
        >
          {item.label}
        </p>
      </motion.div>
    </div>
  );
}

export function Scene4({ onNext, muted, onToggleMute }: SceneProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #0f001e 0%, #200034 60%, #0b0018 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <FloatingHearts count={8} />
      <MusicButton muted={muted} onToggle={onToggleMute} />

      <div className="relative z-10 flex flex-col items-center h-full overflow-y-auto py-10 px-4">
        <motion.div
          className="text-center mb-8"
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
            Our Story So Far 💫
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: 'rgba(255,214,232,0.6)',
              marginTop: 8,
              fontSize: '0.9rem',
            }}
          >
            Scroll to relive every beautiful moment
          </p>
        </motion.div>

        <div className="w-full max-w-lg">
          {MILESTONES.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isLast={i === MILESTONES.length - 1} />
          ))}
        </div>

        <motion.div
          className="mt-8 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <NextButton onClick={onNext} label="And there's more... ❤️" delay={0} />
        </motion.div>
      </div>
    </motion.div>
  );
}
