// Footer Component - Minimal footer

import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.tagline}>
          Midnight Sun is a living archive.
        </p>
        <p className={styles.copyright}>
          © {currentYear}
        </p>
      </div>
    </footer>
  );
}
