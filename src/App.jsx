import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useGameLogic } from './hooks/useGameLogic';
import { Header } from './components/Header';
import { Grid } from './components/Grid';
import { Queue } from './components/Queue';
import { KeepSlot } from './components/KeepSlot';
import { TrashSlot } from './components/TrashSlot';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';
import { PauseOverlay } from './components/PauseOverlay';
import { DraggableTile } from './components/Tile';

import bgDesktop from './assets/Desktop_JustDivide_Game_2.png';

function AppContent() {
  const { state, handleMove, handleTrash, handleKeep } = useGameLogic();
  const [activeId, setActiveId] = useState(null);
  const [activeValue, setActiveValue] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setActiveValue(state.queue[0]);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    setActiveValue(null);
    
    const { over } = event;
    if (!over) return;
    
    const { id, data } = over;
    const type = data.current?.type;
    
    if (type === 'grid') {
      const index = data.current.index;
      if (state.grid[index] === null) {
        handleMove(index, state.queue[0]);
      }
    } else if (type === 'trash') {
      handleTrash();
    } else if (type === 'keep') {
      handleKeep();
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center font-lilita selection:bg-transparent flex flex-col items-center overflow-x-hidden relative"
      style={{ backgroundImage: `url(${bgDesktop})` }}
    >
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center flex-grow pt-2 md:pt-4">
          <Header />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full mt-10 md:mt-16 relative flex-grow max-w-[50rem]">
            
            {/* Left: Main Grid Area */}
            <div className="relative z-10 w-[20rem] md:w-[24rem]">
               <Grid />
            </div>

            {/* Right: Tools Panel (Wooden style) */}
            <div className="relative z-10 w-32 md:w-36 mt-12 md:mt-0">
               <div className="bg-[#f0c27b] border-[8px] border-[#d88c42] rounded-[2rem] w-full flex flex-col items-center justify-evenly h-[26rem] md:h-[30rem] shadow-2xl relative py-4">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <div className="z-10 w-full"><KeepSlot /></div>
                  
                  {/* Queue pill spans wider than the panel */}
                  <div className="z-20 w-[11.5rem] md:w-[13rem] my-4">
                    <Queue />
                  </div>

                  <div className="z-10 w-full"><TrashSlot /></div>
               </div>
            </div>

          </div>
        </div>

        <DragOverlay zIndex={100} dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeId ? (
            <div className="w-16 h-16 md:w-20 md:h-20">
              <DraggableTile id="overlay" value={activeValue} className="w-full h-full scale-110 drop-shadow-2xl z-50" dragged />
            </div>
          ) : null}
        </DragOverlay>

        <RulesModal />
        <PauseOverlay />
        <GameOverModal />
      </DndContext>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
