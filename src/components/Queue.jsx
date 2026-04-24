import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { DraggableTile, StaticTile } from './Tile';

export function Queue() {
  const { state } = useGameLogic();
  const queue = state.queue;

  return (
    <div className="relative">
      {/* White Pill Background */}
      <div className="absolute inset-0 bg-white/90 border-4 border-gray-200 rounded-full shadow-lg -m-2" style={{ zIndex: 5 }}></div>
      <div className="absolute inset-x-2 bg-gradient-to-b from-white to-gray-100 rounded-full top-0 bottom-1" style={{ zIndex: 6 }}></div>
      
      {/* Container */}
      <div className="relative flex items-center justify-between gap-1 px-4 py-2 w-full h-full" style={{ zIndex: 10 }}>
        <div className="w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 flex-shrink-0 relative">
          <DraggableTile id="active-tile" value={queue[0]} className="w-full h-full shadow-md z-20" />
        </div>
        <div className="w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 flex-shrink-0 opacity-80 scale-95">
          <StaticTile value={queue[1]} className="w-full h-full shadow-inner grayscale-[30%]" />
        </div>
        {/* We skip rendering queue[2] to match the visual of 2 items in the capsule */}
      </div>
    </div>
  );
}
