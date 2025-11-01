'use client';

import SearchBox from '@/components/shared/SearchBox/SearchBox';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className="text-2xl">💎</span>
        <span>Super App</span>
      </div>
      
      <div className={styles.headerCenter}>
        <SearchBox />
      </div>
      
      <div className={styles.headerRight}>
        <button className={`${styles.headerBtn} ${styles.notif}`}>🔔</button>
        <button className={`${styles.headerBtn} ${styles.wallet}`}>
          <span>💳</span>
          <span>کیف پول</span>
        </button>
        <button className={`${styles.headerBtn} ${styles.avatar}`}>AR</button>
      </div>
    </header>
  );
}

// Location: src/components/layout/Header/Header.tsx
