'use client';

import { useState } from 'react';
import './tab-system.css';
import ProfileModal from './ProfileModal';
import TodoModal from './TodoModal';
import NotesModal from './NotesModal';

interface Tab {
  id: string;
  title: string;
  icon: string;
  component: string;
  closeable: boolean;
}

interface TabSystemProps {
  onTimeClick: () => void;
  onWeatherClick: () => void;
}

export default function TabSystem({ onTimeClick, onWeatherClick }: TabSystemProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'home', title: 'خانه', icon: '🏠', component: 'home', closeable: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');

  const openTab = (component: string, title: string, icon: string) => {
    const existingTab = tabs.find(t => t.component === component);
    
    if (existingTab) {
      setActiveTab(existingTab.id);
      return;
    }

    const newTab: Tab = {
      id: `${component}-${Date.now()}`,
      title,
      icon,
      component,
      closeable: true
    };

    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);
    
    if (activeTab === tabId) {
      const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0;
      setActiveTab(newTabs[newActiveIndex]?.id || 'home');
    }
    
    setTabs(newTabs);
  };

  const renderTabContent = (component: string) => {
    switch (component) {
      case 'home':
        return <HomeContent onOpenTab={openTab} />;
      case 'profile':
        return <div className="tab-content-wrapper"><ProfileModal isOpen={true} onClose={() => {}} /></div>;
      case 'todo':
        return <div className="tab-content-wrapper"><TodoModal isOpen={true} onClose={() => {}} /></div>;
      case 'notes':
        return <div className="tab-content-wrapper"><NotesModal isOpen={true} onClose={() => {}} /></div>;
      default:
        return <HomeContent onOpenTab={openTab} />;
    }
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="tab-system">
      {/* Tab Bar */}
      <div className="tab-bar">
        <div className="tabs-container">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-title">{tab.title}</span>
              {tab.closeable && (
                <button
                  className="tab-close"
                  onClick={(e) => closeTab(tab.id, e)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button className="new-tab-btn" onClick={() => openTab('home', 'خانه', '🏠')}>
          +
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTabData && renderTabContent(activeTabData.component)}
      </div>
    </div>
  );
}

// Home Content Component
function HomeContent({ onOpenTab }: { onOpenTab: (component: string, title: string, icon: string) => void }) {
  return (
    <div className="welcome-section">
      <h1>خوش آمدید به Super App</h1>
      <p>سوپر اپ ماژولار Web3 شما</p>
      
      <div className="modules-grid">
        <div className="module-card" onClick={() => onOpenTab('notes', 'یادداشت‌ها', '📝')}>
          <div className="module-icon">📝</div>
          <h3>یادداشت‌ها</h3>
          <p>دسته‌بندی، جستجو، ویرایشگر</p>
        </div>

        <div className="module-card" onClick={() => onOpenTab('todo', 'وظایف', '✓')}>
          <div className="module-icon">✓</div>
          <h3>لیست وظایف</h3>
          <p>مدیریت کارها و فعالیت‌ها</p>
        </div>

        <div className="module-card" onClick={() => onOpenTab('profile', 'پروفایل', '👤')}>
          <div className="module-icon">👤</div>
          <h3>پروفایل کاربری</h3>
          <p>مشاهده و ویرایش اطلاعات</p>
        </div>
        
        <div className="module-card">
          <div className="module-icon">💰</div>
          <h3>خدمات مالی</h3>
          <p>کیف پول، صرافی، P2P و بیشتر</p>
        </div>
        
        <div className="module-card">
          <div className="module-icon">🏥</div>
          <h3>سلامت</h3>
          <p>پرونده پزشکی، پزشک آنلاین، داروخانه</p>
        </div>
        
        <div className="module-card">
          <div className="module-icon">👥</div>
          <h3>اجتماعی</h3>
          <p>پیام‌رسانی، شبکه اجتماعی، انجمن‌ها</p>
        </div>
        
        <div className="module-card">
          <div className="module-icon">🛒</div>
          <h3>بازار</h3>
          <p>تجارت الکترونیک، NFT، خدمات</p>
        </div>
      </div>
    </div>
  );
}

// Path: src/components/TabSystem.tsx
