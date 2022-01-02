import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';
import styles from './MainNavigation.module.css';

const MainNavigation = () => {
  const location = useLocation();
  const score = useSelector((state: RootState) => state.gameBoard.score);

  return (
    <header className={styles.header}>
      <div className={styles.text}>MineSweeper</div>
      <div className={styles.score}>
        {location.pathname !== '/home' &&
          '0'.repeat(3 - score.toString().length) + score}
      </div>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to='/home'
      >
        Home
      </NavLink>
    </header>
  );
};

export default MainNavigation;
