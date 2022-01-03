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
  const gameStarted = useSelector(
    (state: RootState) => state.gameBoard.initialized
  );

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
    const timer = setTimeout(() => {
      if (gameStarted && !userLost && !userWon) {
        setSeconds((prevState) => prevState + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [gameStarted, userLost, userWon, seconds]);

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
      <div className={styles.header}>
        <span>{'0'.repeat(3 - score.toString().length) + score}</span>
        <button className={styles.button} onClick={resetGameHandler}>
          Reset
        </button>
        <span>{'0'.repeat(3 - seconds.toString().length) + seconds}</span>
      </div>
      <Board />
    </div>
  );
};

export default Game;
