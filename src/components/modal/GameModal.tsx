import { Link } from 'react-router-dom';
import Modal from './Modal';
import styles from './GameModal.module.css';
import React from 'react';

type Props = {
  text: string;
};

const OrderModal: React.FC<Props> = (props) => {
  const playAgainHandler = () => {
    window.location.reload();
  };

  return (
    <Modal>
      <h1 className={styles.label}>You {props.text}!</h1>
      <Link className={styles.link} to='/home'>
        Home
      </Link>
      <button className={styles.button} onClick={playAgainHandler}>
        Play Again
      </button>
    </Modal>
  );
};

export default OrderModal;
