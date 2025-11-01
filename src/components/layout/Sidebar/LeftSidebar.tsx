'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: '🏠', text: 'خانه', id: 'home' },
  { icon: '💰', text: 'مالی', id: 'financial' },
  { icon: '🏥', text: 'سلامت', id: 'health' },
  { icon: '👥', text: 'اجتماعی', id: 'social' },
  { icon: '🛒', text: 'بازار', id: 'marketplace' },
  { icon: '📚', text: 'آموزش', id: 'education' },
  { icon: '🎬', text: 'سرگرمی', id: 'entertainment' },
  { icon: '✈️', text: 'سفر', id: 'travel' },
  { icon: '💼', text: 'کسب‌وکار', id: 'business' },
  { icon: '🔌', text: 'IoT', id: 'iot' },
  { icon: '🤖', text: 'AI', id: 'ai' },
];

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <aside className={styles.leftSidebar}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.text}>{item.text}</span>
        </div>
      ))}
    </aside>
  );
}

// Location: src/components/layout/Sidebar/LeftSidebar.tsx
