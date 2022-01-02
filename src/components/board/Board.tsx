import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Tile from './Tile';
import styles from './Board.module.css';

const Board = () => {
  const boardItems = useSelector((state: RootState) => state.gameBoard.board);

  // const rows = useSelector((state: RootState) => state.gameBoard.rows);
  // const columns = useSelector((state: RootState) => state.gameBoard.columns);

  // let board: JSX.Element[] = [];

  // boardItems.forEach((row, rowNumber) => {
  //   row.forEach((tile, colNumber) => {
  //     board.push(<Tile key={tile.id} row={rowNumber} col={colNumber} />);
  //   });
  // });

  const rowList = boardItems.map((row) => {
    return (
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
    );
  });

  // const height = (rows * 30).toString().concat('px');
  // const width = (columns * 30).toString().concat('px');

  return (
    // <div className={styles.board} style={{ height: height, width: width }}>
    <div className={styles.board}>{rowList}</div>
  );
};

export default Board;
