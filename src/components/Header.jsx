import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { Pause, HelpCircle, Hourglass } from 'lucide-react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function Header() {
  const { state, togglePause, toggleRules } = useGameLogic();

  return (
    <div className="w-full flex flex-col pt-2 md:pt-4">
      {/* Top Nav Row */}
      <div className="flex justify-between items-start w-full px-2 md:px-6">
        <button 
          onClick={togglePause}
          className="bg-purple-500 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white border-2 border-purple-300 shadow-md transform hover:scale-105 transition-transform"
        >
          {state.isPaused ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z"/></svg>
          ) : (
            <Pause size={24} fill="currentColor" />
          )}
        </button>
        
        <div className="flex flex-col items-center gap-1 md:gap-2 mx-1">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#3f2a24] text-shadow-sm tracking-widest drop-shadow-md pb-0 md:pb-1">
            JUST DIVIDE
          </h1>
          <div className="flex items-center gap-1 md:gap-2 text-lg sm:text-xl md:text-2xl font-bold text-black font-fredoka pt-0 md:pt-1">
            <Hourglass size={20} strokeWidth={2.5} className="md:w-6 md:h-6" />
            {formatTime(state.timer)}
          </div>
        </div>

        <button 
          onClick={toggleRules}
          className="bg-emerald-500 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex flex-shrink-0 items-center justify-center text-white border-2 border-emerald-300 shadow-md transform hover:scale-105 transition-transform"
        >
          <HelpCircle size={20} strokeWidth={2.5} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Subtitle */}
      <div className="w-full text-center mt-3 md:mt-6 px-1">
        <h2 className="text-[#fd6454] stroke-text-white text-shadow-sm md:text-shadow-md text-[0.7rem] sm:text-xs md:text-xl lg:text-2xl font-black tracking-wider md:tracking-wide leading-tight">
          DIVIDE WITH THE NUMBERS TO SOLVE THE ROWS AND COLUMNS.
        </h2>
      </div>
    </div>
  );
}
