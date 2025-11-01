'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <button className={styles.footerSideBtn} title="پشتیبانی">
        <span>💬</span>
      </button>

      <div className={styles.chatSection}>
        <button className={styles.chatActionBtn} title="ضمیمه فایل">
          <span>📎</span>
        </button>
        
        <input 
          type="text" 
          className={styles.chatInput} 
          placeholder="پیام خود را بنویسید..."
        />
        
        <button className={styles.chatActionBtn} title="ارسال صوت">
          <span>🎤</span>
        </button>
        
        <button className={styles.chatSendBtn} title="ارسال">
          <span>➤</span>
        </button>
      </div>

      <button className={styles.footerSideBtn} title="اجتماعی">
        <span>👥</span>
      </button>
    </footer>
  );
}

// Location: src/components/layout/Footer/Footer.tsx
