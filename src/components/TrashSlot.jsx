import { useDroppable } from '@dnd-kit/core';
import { useGameLogic } from '../hooks/useGameLogic';
import { Trash2 } from 'lucide-react';

export function TrashSlot() {
  const { state } = useGameLogic();
  const { isOver, setNodeRef } = useDroppable({
    id: 'trash-slot',
    data: { type: 'trash' },
    disabled: state.trashCount <= 0,
  });

  const highlightClass = isOver && state.trashCount > 0 
    ? 'scale-110 brightness-110 drop-shadow-xl' 
    : state.trashCount > 0 
      ? 'drop-shadow-md' 
      : 'opacity-50 grayscale cursor-not-allowed';

  return (
    <div className="flex flex-col flex-col-reverse md:flex-col items-center z-10 p-0">
      <div className="mt-1 md:mt-0 md:mb-2 text-[#e33434] font-lilita font-black tracking-widest text-sm sm:text-base md:text-lg drop-shadow-sm">
        TRASH
      </div>
      <div
        ref={setNodeRef}
        className={`w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] md:w-[6rem] md:h-[6rem] rounded-2xl bg-gradient-to-b from-[#ff5454] to-[#cc2020] border-4 border-white flex flex-col items-center justify-center transition-all ${highlightClass}`}
      >
        <Trash2 size={24} color="white" fill="white" strokeWidth={1} className="mb-0 md:mb-1 drop-shadow-md w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <span className="text-white font-lilita font-black text-xs sm:text-sm md:text-base drop-shadow-md tracking-wider">
          X{state.trashCount}
        </span>
      </div>
    </div>
  );
}
