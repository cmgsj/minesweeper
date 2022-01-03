import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../redux/board';
import { RootState } from '../../redux/store';
import styles from './Tile.module.css';
import block from '../../resources/block.png';
import flag from '../../resources/flag.png';
import mine from '../../resources/mine.jpeg';
import redMine from '../../resources/red-mine.png';

type Props = {
  row: number;
  col: number;
};

const Tile: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const tile = useSelector(
    (state: RootState) => state.gameBoard.board[props.row][props.col]
  );
  const userWon = useSelector((state: RootState) => state.gameBoard.userWon);

  const row = props.row;
  const col = props.col;

  const leftClickHandler = () => {
    dispatch(boardActions.revealTile({ row, col }));
  };

  const rightClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(boardActions.flagTile({ row, col }));
  };

  const colorsList = [
    'lightgray',
    'blue',
    'green',
    'red',
    'navy',
    'maroon',
    'turquoise',
    'black',
    'gray',
  ];

  const color = colorsList[tile.value];

  let content = <img src={block} alt='block tile' />;
  if (tile.show) {
    if (tile.mined) {
      content = <img src={userWon ? mine : redMine} alt='mine tile' />;
    } else {
      content = <span>{tile.value !== 0 ? tile.value.toString() : ''} </span>;
    }
  }

  if (tile.flagged) {
    content = <img src={flag} alt='flag tile' />;
  }

  return (
    <div
      style={{ color: color }}
      className={styles.cell}
      onClick={leftClickHandler}
      onContextMenu={rightClickHandler}
    >
      {content}
    </div>
  );
};

export default Tile;
