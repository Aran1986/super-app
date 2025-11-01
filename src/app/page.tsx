'use client';

import Header from '@/components/layout/Header/Header';
import LeftSidebar from '@/components/layout/Sidebar/LeftSidebar';
import RightSidebar from '@/components/layout/Sidebar/RightSidebar';
import Footer from '@/components/layout/Footer/Footer';
import ModuleCard from '@/components/shared/ModuleCard/ModuleCard';
import styles from './page.module.css';

const modules = [
  { icon: '💰', title: 'خدمات مالی', description: 'کیف پول، صرافی، P2P و بیشتر' },
  { icon: '🏥', title: 'سلامت', description: 'پرونده پزشکی، پزشک آنلاین، داروخانه' },
  { icon: '👥', title: 'اجتماعی', description: 'پیام‌رسانی، شبکه اجتماعی، انجمن‌ها' },
  { icon: '🛒', title: 'بازار', description: 'تجارت الکترونیک، NFT، خدمات' },
];

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <LeftSidebar />
      
      <main className={styles.mainScreen}>
        <div className={styles.welcomeSection}>
          <h1>خوش آمدید به Super App</h1>
          <p>سوپر اپ ماژولار Web3 شما</p>
          
          <div className={styles.modulesGrid}>
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                icon={module.icon}
                title={module.title}
                description={module.description}
              />
            ))}
          </div>
        </div>
      </main>

      <RightSidebar />
      <Footer />
    </div>
  );
}

// Location: src/app/page.tsx
