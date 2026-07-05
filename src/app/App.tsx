import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useAmbientMusic } from './components/monthsary/Shared';
import { IntroScene } from './components/monthsary/IntroScene';
import { Scene1 } from './components/monthsary/Scene1';
import { Scene2 } from './components/monthsary/Scene2';
import { Scene3 } from './components/monthsary/Scene3';
import { Scene4 } from './components/monthsary/Scene4';
import { Scene5 } from './components/monthsary/Scene5';
import { Scene6 } from './components/monthsary/Scene6';
import { Scene7 } from './components/monthsary/Scene7';
import { FinalScene } from './components/monthsary/FinalScene';

type Scene = 'intro' | 'scene1' | 'scene2' | 'scene3' | 'scene4' | 'scene5' | 'scene6' | 'scene7' | 'final';

const ORDER: Scene[] = ['intro', 'scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6', 'scene7', 'final'];

export default function App() {
  const [scene, setScene] = useState<Scene>('intro');
  const { start, toggleMute, muted, isPlaying } = useAmbientMusic();

  function next(current: Scene) {
    const idx = ORDER.indexOf(current);
    if (idx < ORDER.length - 1) setScene(ORDER[idx + 1]);
  }

  const sceneProps = {
    muted,
    onToggleMute: toggleMute,
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Music Status Indicator for Debugging */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        {isPlaying ? '🎵 Music Playing' : '⏸️ No Music'}
      </div>
      
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <IntroScene
            key="intro"
            onNext={() => next('intro')}
            onStart={start}
            {...sceneProps}
          />
        )}
        {scene === 'scene1' && (
          <Scene1 key="scene1" onNext={() => next('scene1')} {...sceneProps} />
        )}
        {scene === 'scene2' && (
          <Scene2 key="scene2" onNext={() => next('scene2')} {...sceneProps} />
        )}
        {scene === 'scene3' && (
          <Scene3 key="scene3" onNext={() => next('scene3')} {...sceneProps} />
        )}
        {scene === 'scene4' && (
          <Scene4 key="scene4" onNext={() => next('scene4')} {...sceneProps} />
        )}
        {scene === 'scene5' && (
          <Scene5 key="scene5" onNext={() => next('scene5')} {...sceneProps} />
        )}
        {scene === 'scene6' && (
          <Scene6 key="scene6" onNext={() => next('scene6')} {...sceneProps} />
        )}
        {scene === 'scene7' && (
          <Scene7 key="scene7" onNext={() => next('scene7')} {...sceneProps} />
        )}
        {scene === 'final' && (
          <FinalScene key="final" {...sceneProps} />
        )}
      </AnimatePresence>
    </div>
  );
}
