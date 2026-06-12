import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>TaskFlow</div>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Features</a>
            <a href="#" className={styles.link}>Pricing</a>
            <a href="#" className={styles.link}>Contact</a>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
