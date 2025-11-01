'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
}

export default function ClientApp() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'home',
      title: 'خانه',
      icon: '🏠',
      component: <HomeContent />
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('home');

  const openTab = (title: string, icon: string, component: React.ReactNode) => {
    const tabId = `tab-${Date.now()}`;
    const newTab: Tab = { id: tabId, title, icon, component };
    setTabs([...tabs, newTab]);
    setActiveTabId(tabId);
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(t => t.id !== tabId);
    if (newTabs.length === 0) {
      setTabs([{
        id: 'home',
        title: 'خانه',
        icon: '🏠',
        component: <HomeContent />
      }]);
      setActiveTabId('home');
    } else {
      setTabs(newTabs);
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="app-container">
      <Header openTab={openTab} />
      <LeftSidebar openTab={openTab} />
      <RightSidebar openTab={openTab} />
      
      <main className="main-screen">
        <div className="tabs-container">
          <div className="tabs-bar">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`tab-item ${activeTabId === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-title">{tab.title}</span>
                {tab.id !== 'home' && (
                  <button
                    className="tab-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {activeTab?.component}
          </div>
        </div>
      </main>

      <Footer openTab={openTab} />
    </div>
  );
}

function Header({ openTab }: { openTab: (title: string, icon: string, component: React.ReactNode) => void }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="text-2xl">💎</span>
        <span>Super App</span>
      </div>
      
      <div className="header-center">
        <div className="search-box">
          <input type="text" placeholder="جستجو در ماژول‌ها..." />
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="header-btn notif"
          onClick={() => openTab('اعلان‌ها', '🔔', <NotificationsContent />)}
        >
          🔔
        </button>
        <button className="header-btn wallet">
          <span>💳</span>
          <span>کیف پول</span>
        </button>
        <button 
          className="header-btn avatar"
          onClick={() => openTab('پروفایل', '👤', <ProfileContent />)}
        >
          AR
        </button>
      </div>
    </header>
  );
}

function LeftSidebar({ openTab }: { openTab: (title: string, icon: string, component: React.ReactNode) => void }) {
  return (
    <aside className="left-sidebar">
      <div className="menu-item active" onClick={() => openTab('خانه', '🏠', <HomeContent />)}>
        <span className="icon">🏠</span>
        <span className="text">خانه</span>
      </div>
      <div className="menu-item" onClick={() => openTab('خدمات مالی', '💰', <FinancialContent />)}>
        <span className="icon">💰</span>
        <span className="text">مالی</span>
      </div>
      <div className="menu-item" onClick={() => openTab('سلامت', '🏥', <HealthContent />)}>
        <span className="icon">🏥</span>
        <span className="text">سلامت</span>
      </div>
      <div className="menu-item" onClick={() => openTab('اجتماعی', '👥', <SocialContent />)}>
        <span className="icon">👥</span>
        <span className="text">اجتماعی</span>
      </div>
      <div className="menu-item" onClick={() => openTab('بازار', '🛒', <MarketplaceContent />)}>
        <span className="icon">🛒</span>
        <span className="text">بازار</span>
      </div>
      <div className="menu-item" onClick={() => openTab('آموزش', '📚', <EducationContent />)}>
        <span className="icon">📚</span>
        <span className="text">آموزش</span>
      </div>
      <div className="menu-item" onClick={() => openTab('سرگرمی', '🎬', <EntertainmentContent />)}>
        <span className="icon">🎬</span>
        <span className="text">سرگرمی</span>
      </div>
      <div className="menu-item" onClick={() => openTab('سفر', '✈️', <TravelContent />)}>
        <span className="icon">✈️</span>
        <span className="text">سفر</span>
      </div>
      <div className="menu-item" onClick={() => openTab('کسب‌وکار', '💼', <BusinessContent />)}>
        <span className="icon">💼</span>
        <span className="text">کسب‌وکار</span>
      </div>
      <div className="menu-item" onClick={() => openTab('IoT', '🔌', <IoTContent />)}>
        <span className="icon">🔌</span>
        <span className="text">IoT</span>
      </div>
      <div className="menu-item" onClick={() => openTab('AI', '🤖', <AIContent />)}>
        <span className="icon">🤖</span>
        <span className="text">AI</span>
      </div>
    </aside>
  );
}

function RightSidebar({ openTab }: { openTab: (title: string, icon: string, component: React.ReactNode) => void }) {
  return (
    <aside className="right-sidebar">
      <div className="menu-item" onClick={() => openTab('یادداشت‌ها', '📝', <NotesContent />)}>
        <span className="icon">📝</span>
        <span className="text">یادداشت</span>
      </div>
      <div className="menu-item" onClick={() => openTab('تقویم', '📅', <CalendarContent />)}>
        <span className="icon">📅</span>
        <span className="text">تقویم</span>
      </div>
      <div className="menu-item" onClick={() => openTab('لیست کارها', '✓', <TasksContent />)}>
        <span className="icon">✓</span>
        <span className="text">کارها</span>
      </div>
      <div className="menu-item" onClick={() => openTab('تنظیمات', '⚙️', <SettingsContent />)}>
        <span className="icon">⚙️</span>
        <span className="text">تنظیمات</span>
      </div>
    </aside>
  );
}

function Footer({ openTab }: { openTab: (title: string, icon: string, component: React.ReactNode) => void }) {
  return (
    <footer className="footer">
      <button className="footer-side-btn">👈</button>
      
      <div className="chat-section">
        <button className="chat-action-btn">📎</button>
        <input 
          type="text" 
          className="chat-input" 
          placeholder="با AI چت کنید..."
        />
        <button className="chat-action-btn">🎤</button>
        <button className="chat-action-btn">🎨</button>
        <button className="chat-send-btn">➤</button>
      </div>
      
      <button className="footer-side-btn">👉</button>
    </footer>
  );
}

// ===== CONTENT COMPONENTS =====

function HomeContent() {
  return (
    <div className="welcome-section">
      <h1>خوش آمدید به Super App</h1>
      <p>سوپر اپ ماژولار Web3 شما</p>
      
      <div className="modules-grid">
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
          <p>خرید و فروش محصولات دیجیتال و فیزیکی</p>
        </div>

        <div className="module-card">
          <div className="module-icon">📚</div>
          <h3>آموزش</h3>
          <p>دوره‌ها، وبینارها و محتوای آموزشی</p>
        </div>

        <div className="module-card">
          <div className="module-icon">🎬</div>
          <h3>سرگرمی</h3>
          <p>موسیقی، ویدیو، بازی و محتوای سرگرمی</p>
        </div>
      </div>
    </div>
  );
}

function ProfileContent() {
  return (
    <div className="module-content">
      <div className="profile-section">
        <div className="profile-avatar">AR</div>
        <h2>علی رضایی</h2>
        <p>ali.rezaei@example.com</p>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">دنبال‌کننده</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">45</span>
            <span className="stat-label">دنبال‌شونده</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsContent() {
  return (
    <div className="module-content">
      <h2>اعلان‌ها</h2>
      <div className="notifications-list">
        <div className="notification-item">
          <span className="notif-icon">💰</span>
          <div className="notif-content">
            <p className="notif-title">تراکنش جدید</p>
            <p className="notif-desc">واریز 100 دلار به حساب شما</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotesContent() {
  return (
    <div className="module-content">
      <h2>یادداشت‌های من</h2>
      <div className="notes-grid">
        <div className="note-card">
          <h3>یادداشت اول</h3>
          <p>محتوای یادداشت...</p>
        </div>
      </div>
    </div>
  );
}

function CalendarContent() {
  return (
    <div className="module-content">
      <h2>تقویم</h2>
      <div className="calendar-view">
        <p>نمای تقویم در اینجا...</p>
      </div>
    </div>
  );
}

function TasksContent() {
  return (
    <div className="module-content">
      <h2>لیست کارها</h2>
      <div className="tasks-list">
        <div className="task-item">
          <input type="checkbox" />
          <span>کار اول</span>
        </div>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="module-content">
      <h2>تنظیمات</h2>
      <div className="settings-sections">
        <div className="setting-item">
          <span>زبان</span>
          <select>
            <option>فارسی</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function FinancialContent() {
  return (
    <div className="module-content">
      <h2>خدمات مالی</h2>
      <div className="financial-modules">
        <div className="sub-module-card">💳 کیف پول</div>
        <div className="sub-module-card">💱 صرافی</div>
        <div className="sub-module-card">🤝 P2P</div>
        <div className="sub-module-card">🏦 بانکداری</div>
      </div>
    </div>
  );
}

function HealthContent() {
  return (
    <div className="module-content">
      <h2>خدمات سلامت</h2>
      <div className="health-modules">
        <div className="sub-module-card">📋 پرونده پزشکی</div>
        <div className="sub-module-card">👨‍⚕️ پزشک آنلاین</div>
        <div className="sub-module-card">💊 داروخانه</div>
        <div className="sub-module-card">⏰ یادآوری دارو</div>
      </div>
    </div>
  );
}

function SocialContent() {
  return (
    <div className="module-content">
      <h2>شبکه‌های اجتماعی</h2>
      <div className="social-modules">
        <div className="sub-module-card">💬 پیام‌رسان</div>
        <div className="sub-module-card">📱 شبکه اجتماعی</div>
        <div className="sub-module-card">👥 انجمن‌ها</div>
      </div>
    </div>
  );
}

function MarketplaceContent() {
  return (
    <div className="module-content">
      <h2>بازار</h2>
      <div className="marketplace-modules">
        <div className="sub-module-card">🛍️ فروشگاه</div>
        <div className="sub-module-card">🎨 NFT</div>
      </div>
    </div>
  );
}

function EducationContent() {
  return (
    <div className="module-content">
      <h2>آموزش</h2>
      <div className="education-modules">
        <div className="sub-module-card">📖 دوره‌ها</div>
        <div className="sub-module-card">🎓 وبینار</div>
      </div>
    </div>
  );
}

function EntertainmentContent() {
  return (
    <div className="module-content">
      <h2>سرگرمی</h2>
      <div className="entertainment-modules">
        <div className="sub-module-card">🎵 موسیقی</div>
        <div className="sub-module-card">🎬 ویدیو</div>
        <div className="sub-module-card">🎮 بازی</div>
      </div>
    </div>
  );
}

function TravelContent() {
  return (
    <div className="module-content">
      <h2>سفر</h2>
      <div className="travel-modules">
        <div className="sub-module-card">✈️ پرواز</div>
        <div className="sub-module-card">🏨 هتل</div>
      </div>
    </div>
  );
}

function BusinessContent() {
  return (
    <div className="module-content">
      <h2>کسب‌وکار</h2>
      <div className="business-modules">
        <div className="sub-module-card">📊 مدیریت</div>
        <div className="sub-module-card">📈 تحلیل</div>
      </div>
    </div>
  );
}

function IoTContent() {
  return (
    <div className="module-content">
      <h2>اینترنت اشیا</h2>
      <div className="iot-modules">
        <div className="sub-module-card">🏠 خانه هوشمند</div>
        <div className="sub-module-card">🚗 خودرو</div>
      </div>
    </div>
  );
}

function AIContent() {
  return (
    <div className="module-content">
      <h2>هوش مصنوعی</h2>
      <div className="ai-modules">
        <div className="sub-module-card">💬 چت AI</div>
        <div className="sub-module-card">🎨 تولید تصویر</div>
      </div>
    </div>
  );
}

// Location: src/components/ClientApp.tsx
