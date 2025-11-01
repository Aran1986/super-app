'use client';

import styles from './Sidebar.module.css';

const quickActions = [
  { icon: '📌', title: 'پین شده' },
  { icon: '⭐', title: 'علاقه‌مندی' },
  { icon: '📁', title: 'فایل‌ها' },
  { icon: '⚙️', title: 'تنظیمات' },
];

export default function RightSidebar() {
  return (
    <aside className={styles.rightSidebar}>
      {quickActions.map((action, index) => (
        <div key={index} className={styles.menuItem} title={action.title}>
          <span className={styles.icon}>{action.icon}</span>
        </div>
      ))}
    </aside>
  );
}

// Location: src/components/layout/Sidebar/RightSidebar.tsx
