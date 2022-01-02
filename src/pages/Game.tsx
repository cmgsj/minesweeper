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
  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();

  const userWon = useSelector((state: RootState) => state.gameBoard.userWon);
  const userLost = useSelector((state: RootState) => state.gameBoard.userLost);
  const score = useSelector((state: RootState) => state.gameBoard.score);

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

  useEffect(() => {
    setTimeout(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
  }, [seconds]);

  const resetGameHandler = () => {
    dispatch(boardActions.createPreviousBoard());
  };

  return (
    <div>
      {showModal && <GameModal text={message} />}
      <div className={styles.header}>
        <span className={styles.score}>
          {'0'.repeat(3 - score.toString().length) + score}
        </span>
        <button className={styles.button} onClick={resetGameHandler}>
          Reset
        </button>
        <span className={styles.timer}>
          {'0'.repeat(3 - seconds.toString().length) + seconds}
        </span>
      </div>
      <Board />
    </div>
  );
};

export default Game;
