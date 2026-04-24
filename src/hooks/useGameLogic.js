import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export function useGameLogic() {
  const { state, dispatch } = useContext(GameContext);

  const handleMove = (index, value) => {
    dispatch({ type: 'PLACE_TILE', payload: { index, value } });
  };

  const handleTrash = () => {
    dispatch({ type: 'USE_TRASH' });
  };

  const handleKeep = () => {
    dispatch({ type: 'TOGGLE_KEEP' });
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const toggleHints = () => {
    dispatch({ type: 'TOGGLE_HINTS' });
  };

  const togglePause = () => {
    dispatch({ type: 'TOGGLE_PAUSE' });
  };

  const toggleRules = () => {
    dispatch({ type: 'TOGGLE_RULES' });
  };

  const closeRules = () => {
    dispatch({ type: 'CLOSE_RULES' });
  };

  const restartGame = () => {
    dispatch({ type: 'RESTART' });
  };

  return {
    state,
    handleMove,
    handleTrash,
    handleKeep,
    handleUndo,
    toggleHints,
    togglePause,
    toggleRules,
    closeRules,
    restartGame
  };
}
