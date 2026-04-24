export function getNextTile() {
  const options = [2, 3, 4, 5, 6, 8, 9, 10, 12];
  return options[Math.floor(Math.random() * options.length)];
}

export function canMerge(tile, neighbor) {
  if (tile === null || neighbor === null) return false;
  return (
    tile === neighbor ||
    (tile > neighbor && tile % neighbor === 0) ||
    (neighbor > tile && neighbor % tile === 0)
  );
}

export function getAdjacentIndices(index) {
  const row = Math.floor(index / 4);
  const col = index % 4;
  const adjacent = [];

  if (row > 0) adjacent.push(index - 4); // up
  if (row < 3) adjacent.push(index + 4); // down
  if (col > 0) adjacent.push(index - 1); // left
  if (col < 3) adjacent.push(index + 1); // right

  return adjacent;
}

export function isGameOver(grid) {
  const hasEmptyCell = grid.some((cell) => cell === null);
  if (hasEmptyCell) return false;

  const hasValidMerge = grid.some((cell, i) => {
    if (cell === null) return false;
    const adjacent = getAdjacentIndices(i);
    return adjacent.some((adjIndex) => canMerge(cell, grid[adjIndex]));
  });

  return !hasValidMerge;
}
