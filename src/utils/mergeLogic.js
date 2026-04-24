import { getAdjacentIndices } from './helpers';

export function runMergeLogic(grid, startIndex) {
  let newGrid = [...grid];
  let currentPos = startIndex;
  let scoreGained = 0;
  let hasMerged = true;

  // We loop until no more merges happen for the newly formed tile
  while (hasMerged) {
    hasMerged = false;
    const tileVal = newGrid[currentPos];
    
    if (tileVal === null) break;

    const adjacent = getAdjacentIndices(currentPos);
    
    // Find the first valid merge (we could prioritize largest/smallest, but let's just pick the first valid one)
    for (const adjPos of adjacent) {
      const neighborVal = newGrid[adjPos];
      if (neighborVal === null) continue;

      if (tileVal === neighborVal) {
        // Equal Tiles -> Both removed
        newGrid[currentPos] = null;
        newGrid[adjPos] = null;
        scoreGained += (tileVal * 2);
        hasMerged = false; // tile is gone, stop
        break;
      } else if (tileVal % neighborVal === 0) {
        // tile is larger and divisible by neighbor
        const result = tileVal / neighborVal;
        newGrid[currentPos] = result === 1 ? null : result;
        newGrid[adjPos] = null;
        scoreGained += tileVal;
        currentPos = currentPos; // stays same
        hasMerged = result !== 1; // if null, stop merging
        break;
      } else if (neighborVal % tileVal === 0) {
        // neighbor is larger and divisible by tile
        const result = neighborVal / tileVal;
        newGrid[adjPos] = result === 1 ? null : result;
        newGrid[currentPos] = null;
        scoreGained += neighborVal;
        currentPos = adjPos; // move focus to the neighbor which absorbed the tile
        hasMerged = result !== 1;
        break;
      }
    }
  }

  return { newGrid, scoreGained };
}
