import img from '../assets/react.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.flex}>
      <img src={img} className={`${styles.icon} codystar-regular`} />
      <h1 className={styles.h1}>THE REACT QUIZ</h1>
    </header>
  );
}
