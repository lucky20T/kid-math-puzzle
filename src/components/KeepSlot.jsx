import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useGameLogic } from '../hooks/useGameLogic';
import { StaticTile } from './Tile';
import placementBoxImg from '../assets/Placement_Box.png';

export function KeepSlot() {
  const { state } = useGameLogic();
  const { isOver, setNodeRef } = useDroppable({
    id: 'keep-slot',
    data: { type: 'keep' },
  });

  const highlightClass = isOver ? 'scale-110 brightness-110' : '';

  return (
    <div className="flex flex-col items-center z-10 w-full pt-4">
      <div
        ref={setNodeRef}
        className={`relative w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] flex items-center justify-center transition-all ${highlightClass}`}
      >
        <img 
          src={placementBoxImg} 
          alt="Keep Slot" 
          className="absolute inset-0 w-full h-full object-fill drop-shadow-md"
        />
        {state.keepVal !== null && (
          <StaticTile value={state.keepVal} className="w-[85%] h-[85%] z-10" />
        )}
      </div>
      <div className="mt-2 text-[#0c7075] font-lilita font-black tracking-widest text-lg drop-shadow-sm">
        KEEP
      </div>
    </div>
  );
}
