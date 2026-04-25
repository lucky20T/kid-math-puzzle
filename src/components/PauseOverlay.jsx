import { useGameLogic } from '../hooks/useGameLogic';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export function PauseOverlay() {
  const { state, togglePause } = useGameLogic();

  return (
    <AnimatePresence>
      {state.isPaused && !state.showRules && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <h2 className="text-6xl md:text-8xl font-lilita text-white drop-shadow-2xl mb-8 tracking-widest stroke-text">
              PAUSED
            </h2>
            
            <button
              onClick={togglePause}
              className="bg-purple-500 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-white border-4 border-purple-300 shadow-[0_0_40px_rgba(168,85,247,0.6)] transform hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
            >
              <Play size={48} fill="currentColor" className="ml-2" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
