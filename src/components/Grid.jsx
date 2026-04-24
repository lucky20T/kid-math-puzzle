import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { StaticTile } from './Tile';
import { useGameLogic } from '../hooks/useGameLogic';
import catImg from '../assets/Cat.png';
import badgeImg from '../assets/Levels and Score.png';

function GridCell({ index, value }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `grid-${index}`,
    data: { index, type: 'grid' },
  });

  const highlightClass = isOver 
    ? 'border-4 border-white/80 scale-[1.03]' 
    : 'border-2 border-teal-300';

  return (
    <div
      ref={setNodeRef}
      className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all bg-[#086a6e] shadow-inner ${highlightClass}`}
    >
      {value !== null && (
        <StaticTile value={value} className="w-[85%] h-[85%]" />
      )}
    </div>
  );
}

export function Grid() {
  const { state } = useGameLogic();

  return (
    <div className="relative mt-20 md:mt-24 w-full h-full">
      
      {/* Cat Graphic */}
      <img 
        src={catImg} 
        alt="Cat" 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[86%] w-[85%] md:w-[90%] z-10 drop-shadow-md pointer-events-none" 
      />

      {/* Badges container */}
      <div className="absolute top-0 w-full flex justify-between z-20 px-1 transform -translate-y-[40%]">
        {/* Level Badge */}
        <div className="relative w-36 md:w-44 h-14 md:h-16 flex items-center justify-center transform -translate-x-2 md:-translate-x-6">
          <img src={badgeImg} alt="Badge" className="absolute inset-0 w-full h-full object-fill drop-shadow-md rounded-xl" />
          <span className="relative text-white font-lilita text-shadow-md text-xl md:text-2xl mt-1 md:mt-2 tracking-wide">
            LEVEL {state.level}
          </span>
        </div>
        
        {/* Score Badge */}
        <div className="relative w-40 md:w-48 h-14 md:h-16 flex items-center justify-center transform translate-x-2 md:translate-x-6">
          <img src={badgeImg} alt="Badge" className="absolute inset-0 w-full h-full object-fill drop-shadow-md rounded-xl" />
          <span className="relative text-white font-lilita text-shadow-md text-xl md:text-2xl mt-1 md:mt-2 tracking-wide">
            SCORE {state.score}
          </span>
        </div>
      </div>

      {/* Main Grid Card */}
      <div className="bg-[#15989e] border-[6px] border-white/90 rounded-[2rem] shadow-xl p-3 pt-6 md:p-4 md:pt-8 z-0 relative w-full h-full">
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full h-full">
          {state.grid.map((cell, i) => (
            <GridCell key={i} index={i} value={cell} />
          ))}
        </div>
      </div>
    </div>
  );
}
