import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

import blueBg from '../assets/blue.png';
import orangeBg from '../assets/orange.png';
import pinkBg from '../assets/pink.png';
import purpleBg from '../assets/purpule.png';
import redBg from '../assets/red.png';
// I'll also add a green and gray fallback if needed, but we can reuse the ones we have or use CSS filters if we desperately need other colors.
// Actually, looking at the image: 8 is orange, 6 is yellow (maybe orange too?), 35 is purple, 32 is red, 12 is green/gray. 
// Wait, the assets only list: blue.png, orange.png, pink.png, purpule.png, red.png. I'll cycle through them.

const bgImages = [blueBg, orangeBg, pinkBg, purpleBg, redBg];

function getTileImage(value) {
  if (value === null) return blueBg; // fallback
  // Generate a deterministic index for any number
  const hash = value.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return bgImages[hash % bgImages.length];
}

function getTextStyle(value) {
  // To match the image: text is color-coordinated, e.g. red 32 has dark red text outline, or we just use white/bold standard stroke.
  // The image shows text in dark shadows/gradients. Let's use deep red/black drop shadow on text.
  return {
    color: '#a13a28',
    WebkitTextStroke: '1px white'
  };
}

export function DraggableTile({ id, value, disabled = false, className = '', dragged = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { value },
    disabled,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 50,
  } : undefined;

  const bgImg = getTileImage(value);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative flex items-center justify-center font-lilita text-white rounded-lg select-none touch-none bg-cover bg-center overflow-hidden
        ${isDragging || dragged ? 'opacity-100 z-50' : ''}
        ${className}
      `}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        ...style,
        backgroundImage: `url(${bgImg})`
      }}
    >
      <span 
        className="text-2xl md:text-3xl font-black pt-1 drop-shadow-md"
        style={getTextStyle(value)}
      >
        {value}
      </span>
      {/* Gloss reflection overlay to match original gel buttons if needed, but image already has it */}
    </motion.div>
  );
}

export function StaticTile({ value, className = '' }) {
  const bgImg = getTileImage(value);

  return (
    <motion.div
      className={`relative flex items-center justify-center font-lilita text-white rounded-lg select-none bg-cover bg-center overflow-hidden
        ${className}
      `}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      layout
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <span 
        className="text-2xl md:text-3xl font-black pt-1 drop-shadow-md"
        style={getTextStyle(value)}
      >
        {value}
      </span>
    </motion.div>
  );
}
