import { useReducer, useEffect } from 'react';
import { GameContext } from './GameContextDef';
import { getNextTile, isGameOver } from '../utils/helpers';
import { runMergeLogic } from '../utils/mergeLogic';

const initialState = {
  grid: Array(16).fill(null),
  queue: [getNextTile(), getNextTile(), getNextTile()],
  keepVal: null,
  score: 0,
  bestScore: parseInt(localStorage.getItem('bestScore')) || 0,
  level: 1,
  trashCount: 3,
  undoStack: [],
  hintsEnabled: false,
  timer: 0,
  gameOver: false,
  isPaused: false,
  showRules: false,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'PLACE_TILE': {
      if (state.isPaused || state.gameOver) return state;
      const { index, value } = action.payload;
      
      const newUndoStack = [...state.undoStack, state].slice(-10);

      let newGrid = [...state.grid];
      newGrid[index] = value;

      const { newGrid: mergedGrid, scoreGained } = runMergeLogic(newGrid, index);
      const newScore = state.score + scoreGained;
      
      let newLevel = state.level;
      let newTrashCount = state.trashCount;
      if (newScore >= newLevel * 10) {
        newLevel++;
        newTrashCount += 2;
      }

      const newQueue = [...state.queue.slice(1), getNextTile()];
      const over = isGameOver(mergedGrid);

      return {
        ...state,
        grid: mergedGrid,
        score: newScore,
        level: newLevel,
        trashCount: newTrashCount,
        queue: newQueue,
        undoStack: newUndoStack,
        gameOver: over,
      };
    }

    case 'USE_TRASH': {
      if (state.isPaused || state.gameOver || state.trashCount <= 0) return state;
      const newUndoStack = [...state.undoStack, state].slice(-10);
      const newQueue = [...state.queue.slice(1), getNextTile()];
      return {
        ...state,
        trashCount: state.trashCount - 1,
        queue: newQueue,
        undoStack: newUndoStack,
      };
    }

    case 'TOGGLE_KEEP': {
      if (state.isPaused || state.gameOver) return state;
      const currentTile = state.queue[0];
      const newUndoStack = [...state.undoStack, state].slice(-10);
      
      if (state.keepVal === null) {
        return {
          ...state,
          keepVal: currentTile,
          queue: [...state.queue.slice(1), getNextTile()],
          undoStack: newUndoStack,
        };
      } else {
        const previousKeep = state.keepVal;
        const newQueue = [previousKeep, ...state.queue.slice(1)];
        return {
          ...state,
          keepVal: currentTile,
          queue: newQueue,
          undoStack: newUndoStack,
        };
      }
    }

    case 'UNDO': {
      if (state.isPaused || state.gameOver || state.undoStack.length === 0) return state;
      const previousState = state.undoStack[state.undoStack.length - 1];
      return {
        ...previousState,
        isPaused: state.isPaused, 
        showRules: state.showRules,
      };
    }

    case 'TOGGLE_HINTS': return { ...state, hintsEnabled: !state.hintsEnabled };
    case 'TOGGLE_PAUSE': return { ...state, isPaused: !state.isPaused };
    case 'TOGGLE_RULES': return { ...state, showRules: !state.showRules, isPaused: !state.showRules ? true : state.isPaused };
    case 'CLOSE_RULES': return { ...state, showRules: false, isPaused: false };
    case 'TICK_TIMER': return { ...state, timer: state.timer + 1 };
    
    case 'RESTART': {
      return {
        ...initialState,
        bestScore: state.bestScore,
        queue: [getNextTile(), getNextTile(), getNextTile()],
      };
    }

    case 'UPDATE_BEST_SCORE': return { ...state, bestScore: action.payload };
    default: return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect
  useEffect(() => {
    if (!state.gameOver && !state.isPaused) {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.gameOver, state.isPaused]);

  // Sync best score to state/localStorage
  useEffect(() => {
    if (state.score > state.bestScore) {
      dispatch({ type: 'UPDATE_BEST_SCORE', payload: state.score });
      localStorage.setItem('bestScore', state.score.toString());
    }
  }, [state.score, state.bestScore]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
