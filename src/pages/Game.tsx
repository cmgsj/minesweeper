import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../redux/board';
import { RootState } from '../redux/store';
import Board from '../components/board/Board';
import GameModal from '../components/modal/GameModal';
import styles from './Game.module.css';

const Game = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userWon = useSelector((state: RootState) => state.gameBoard.userWon);
  const userLost = useSelector((state: RootState) => state.gameBoard.userLost);

  useEffect(() => {
    if (userWon) {
      setMessage('Won');
      setShowModal(true);
    }
    if (userLost) {
      setMessage('Lost');
      setShowModal(true);
    }
  }, [userWon, userLost]);

  useEffect(() => {
    setShowModal(false);
    dispatch(boardActions.createPreviousBoard());
  }, [dispatch]);

  const resetGameHandler = () => {
    dispatch(boardActions.createPreviousBoard());
  };

  return (
    <div>
      {showModal && <GameModal text={message} />}
      <button className={styles.button} onClick={resetGameHandler}>
        Reset
      </button>
      <Board />
    </div>
  );
};

export default Game;
