import React, { useState, useEffect } from 'react';
import { BoardConfig, defaultBoardConfig } from '../../redux/board';
import styles from './SliderForm.module.css';

type Props = {
  onHide: () => void;
  onSubmit: (boardConfig: BoardConfig) => void;
};

const SliderFrom: React.FC<Props> = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [rowsInput, setRowsInput] = useState(defaultBoardConfig.rows);
  const [columnsInput, setColumnsInput] = useState(defaultBoardConfig.columns);
  const [minesInput, setMinesInput] = useState(defaultBoardConfig.mines);

  const rowsSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsInput(+event.target.value);
  };

  const columnsSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumnsInput(+event.target.value);
  };

  const minesSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinesInput(+event.target.value);
  };

  useEffect(() => {
    setFormIsValid(minesInput < rowsInput * columnsInput);
  }, [minesInput, rowsInput, columnsInput]);

  const resetFormHandler = () => {
    setRowsInput(defaultBoardConfig.rows);
    setColumnsInput(defaultBoardConfig.columns);
    setMinesInput(defaultBoardConfig.mines);
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsValid) {
      props.onSubmit({
        rows: rowsInput,
        columns: columnsInput,
        mines: minesInput,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <div>
        <label>Rows</label>
        <input
          type='range'
          min='3'
          max='24'
          step='1'
          value={rowsInput}
          onChange={rowsSliderChangeHandler}
        />
        <span>{rowsInput}</span>
      </div>
      <div>
        <label>Columns</label>
        <input
          type='range'
          min='3'
          max='12'
          step='1'
          value={columnsInput}
          onChange={columnsSliderChangeHandler}
        />
        <span>{columnsInput}</span>
      </div>
      <div>
        <label>Mines</label>
        <input
          type='range'
          min='1'
          max='48'
          step='1'
          value={minesInput}
          onChange={minesSliderChangeHandler}
        />
        <span>{minesInput}</span>
      </div>
      <div className={styles.buttons}>
        <button type='button' onClick={props.onHide}>
          Cancel
        </button>
        <button type='button' onClick={resetFormHandler}>
          Reset
        </button>
        <button type='submit' disabled={!formIsValid}>
          Start Game
        </button>
      </div>
    </form>
  );
};

export default SliderFrom;
