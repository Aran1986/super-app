'use client';

import styles from './ModuleCard.module.css';

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ModuleCard({ icon, title, description, onClick }: ModuleCardProps) {
  return (
    <div className={styles.moduleCard} onClick={onClick}>
      <div className={styles.moduleIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Location: src/components/shared/ModuleCard/ModuleCard.tsx
