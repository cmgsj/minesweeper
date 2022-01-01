import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { boardActions, BoardConfig } from '../redux/board';
import { useHistory } from 'react-router-dom';
import styles from './Home.module.css';
import SliderFrom from '../components/form/SliderForm';

const MainPage = () => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const submitFormHandler = (boardConfig: BoardConfig) => {
    dispatch(
      boardActions.createCustomBoard({
        rows: boardConfig.rows,
        columns: boardConfig.columns,
        mines: boardConfig.mines,
      })
    );
    history.replace('/game');
  };

  return (
    <div className={styles.home}>
      {!showForm && (
        <button className={styles.button} onClick={showFormHandler}>
          New Game
        </button>
      )}
      {showForm && (
        <SliderFrom onHide={hideFormHandler} onSubmit={submitFormHandler} />
      )}
    </div>
  );
};

export default MainPage;
