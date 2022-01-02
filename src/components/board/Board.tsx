import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Tile from './Tile';
import styles from './Board.module.css';

const Board = () => {
  const boardItems = useSelector((state: RootState) => state.gameBoard.board);

  const rows = useSelector((state: RootState) => state.gameBoard.rows);
  const columns = useSelector((state: RootState) => state.gameBoard.columns);

  let board = [];
  for (let row = 0; row < boardItems.length; row++) {
    for (let col = 0; col < boardItems[row].length; col++) {
      board.push(
        <Tile key={row.toString() + '-' + col.toString()} row={row} col={col} />
      );
    }
  }

  const height = (rows * 30).toString().concat('px');
  const width = (columns * 30).toString().concat('px');

  return (
    <section className={styles.board} style={{ height: height, width: width }}>
      {board}
    </section>
  );
};

export default Board;
