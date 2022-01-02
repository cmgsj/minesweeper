import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.text}>MineSweeper</div>
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
