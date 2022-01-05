import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Tile from './Tile';
import styles from './Board.module.css';

const Board = () => {
  const boardItems = useSelector((state: RootState) => state.gameBoard.board);

  const rowList = boardItems.map((row) => (
    <ul key={row[0].id}>
      {row.map((cell) => (
        <li key={cell.id} className={styles.cell}>
          <Tile
            key={cell.id}
            row={+cell.id.split('-')[0]}
            col={+cell.id.split('-')[1]}
          />
        </li>
      ))}
    </ul>
  ));

  return <div className={styles.board}>{rowList}</div>;
};

export default Board;
