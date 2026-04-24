import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { motion, AnimatePresence } from 'framer-motion';

export function RulesModal() {
  const { state, closeRules } = useGameLogic();

  return (
    <AnimatePresence>
      {state.showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative border-8 border-teal-500 font-fredoka"
          >
            <button 
              onClick={closeRules}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center font-black text-gray-600"
            >
              X
            </button>
            <h2 className="text-4xl font-lilita text-[#15989e] mb-4 drop-shadow-sm text-center">How to Play</h2>
            
            <ul className="space-y-4 text-gray-700 text-lg font-medium">
              <li className="flex items-start">
                <span className="text-teal-500 font-black mr-2 text-xl">•</span>
                Drag tiles onto the main grid.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 font-black mr-2 text-xl">•</span>
                If you place a tile next to a number it divides evenly into, they merge and you get the quotient!
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 font-black mr-2 text-xl">•</span>
                If you place a tile next to the same number, they both disappear.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 font-black mr-2 text-xl">•</span>
                Use the <strong>KEEP</strong> slot to save a tile for later.
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-black mr-2 text-xl">•</span>
                Use the <strong>TRASH</strong> to permanently delete a tile you don't need (limited uses!).
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 font-black mr-2 text-xl">•</span>
                Clear rows and columns to score big!
              </li>
            </ul>
            
            <button
              onClick={closeRules}
              className="w-full mt-8 bg-teal-500 hover:bg-teal-600 text-white font-lilita text-xl tracking-widest py-4 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              GOT IT!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
