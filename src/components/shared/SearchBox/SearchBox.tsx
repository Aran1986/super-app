'use client';

import styles from './SearchBox.module.css';

export default function SearchBox() {
  return (
    <div className={styles.searchBox}>
      <input type="text" placeholder="جستجو در ماژول‌ها..." />
    </div>
  );
}

// Location: src/components/shared/SearchBox/SearchBox.tsx
