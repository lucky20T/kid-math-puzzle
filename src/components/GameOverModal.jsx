import { useGameLogic } from '../hooks/useGameLogic';
import { motion, AnimatePresence } from 'framer-motion';

export function GameOverModal() {
  const { state, restartGame } = useGameLogic();

  return (
    <AnimatePresence>
      {state.gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
          >
            <h2 className="text-4xl font-extrabold text-rose-500 mb-2">Game Over!</h2>
            <p className="text-gray-500 mb-6 font-medium">No more valid moves possible.</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-1">Final Score</p>
              <p className="text-5xl font-black text-slate-800">{state.score}</p>
              
              {state.score >= state.bestScore && state.score > 0 && (
                <div className="mt-3 inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                  New Best Score!
                </div>
              )}
            </div>
            
            <button
              onClick={restartGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
