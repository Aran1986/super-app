'use client';

import { useState } from 'react';

export default function Home() {
  // State management for tabs
  const [tabs, setTabs] = useState<any[]>([
    { id: 'home', title: 'خانه', icon: '🏠', closable: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');

  // Open new tab function
  const openTab = (id: string, title: string, icon: string, content: React.ReactNode) => {
    const existingTab = tabs.find(tab => tab.id === id);
    if (existingTab) {
      setActiveTab(id);
    } else {
      setTabs([...tabs, { id, title, icon, content, closable: true }]);
      setActiveTab(id);
    }
  };

  // Close tab function
  const closeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1]?.id || 'home');
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  // Home content component
  const HomeContent = () => (
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
          <p>تجارت الکترونیک، NFT، خدمات</p>
        </div>
      </div>
    </div>
  );

  // Todo content
  const TodoContent = () => (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>📝 لیست کارها</h2>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>مدیریت کارهای روزانه</p>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <p>محتوای Todo List اینجا قرار می‌گیرد</p>
      </div>
    </div>
  );

  // Notes content
  const NotesContent = () => (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>📓 یادداشت‌ها</h2>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>یادداشت‌های شما</p>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <p>محتوای یادداشت‌ها اینجا قرار می‌گیرد</p>
      </div>
    </div>
  );

  // Weather content
  const WeatherContent = () => (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🌤️ هواشناسی</h2>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>وضعیت آب و هوا</p>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>☀️</div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>25°C</div>
        <div style={{ fontSize: '20px', color: '#64748b' }}>تهران - آفتابی</div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
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
          {/* Todo Button - Opens in Tab */}
          <button 
            className="header-btn notif" 
            onClick={() => openTab('todo', 'لیست کارها', '📝', <TodoContent />)}
            title="لیست کارها"
          >
            📝
          </button>
          
          <button className="header-btn notif">🔔</button>
          <button className="header-btn wallet">
            <span>💳</span>
            <span>کیف پول</span>
          </button>
          <button className="header-btn avatar">AR</button>
        </div>
      </header>

      <aside className="left-sidebar">
        <div className="menu-item active">
          <span className="icon">🏠</span>
          <span className="text">خانه</span>
        </div>
        <div className="menu-item">
          <span className="icon">💰</span>
          <span className="text">مالی</span>
        </div>
        <div className="menu-item">
          <span className="icon">🏥</span>
          <span className="text">سلامت</span>
        </div>
        <div className="menu-item">
          <span className="icon">👥</span>
          <span className="text">اجتماعی</span>
        </div>
        <div className="menu-item">
          <span className="icon">🛒</span>
          <span className="text">بازار</span>
        </div>
        <div className="menu-item">
          <span className="icon">📚</span>
          <span className="text">آموزش</span>
        </div>
        <div className="menu-item">
          <span className="icon">🎬</span>
          <span className="text">سرگرمی</span>
        </div>
        <div className="menu-item">
          <span className="icon">✈️</span>
          <span className="text">سفر</span>
        </div>
        <div className="menu-item">
          <span className="icon">💼</span>
          <span className="text">کسب‌وکار</span>
        </div>
        <div className="menu-item">
          <span className="icon">🔌</span>
          <span className="text">IoT</span>
        </div>
        <div className="menu-item">
          <span className="icon">🤖</span>
          <span className="text">AI</span>
        </div>
      </aside>

      <main className="main-screen">
        {/* Tab Bar - Only shows when there are multiple tabs */}
        {tabs.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 20px',
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            overflowX: 'auto'
          }}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#f8fafc',
                  color: activeTab === tab.id ? 'white' : '#0f172a',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  userSelect: 'none'
                }}
              >
                <span>{tab.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{tab.title}</span>
                {tab.closable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    style={{
                      marginRight: '8px',
                      background: activeTab === tab.id ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                      border: 'none',
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: activeTab === tab.id ? 'white' : '#0f172a'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Content */}
        {currentTab?.id === 'home' ? <HomeContent /> : currentTab?.content}
      </main>

      <aside className="right-sidebar">
        {/* Notes Button - Opens in Tab */}
        <div 
          className="menu-item"
          onClick={() => openTab('notes', 'یادداشت‌ها', '📓', <NotesContent />)}
          title="یادداشت‌ها"
          style={{ cursor: 'pointer' }}
        >
          <span className="icon">📓</span>
        </div>
        <div className="menu-item">
          <span className="icon">⭐</span>
        </div>
        <div className="menu-item">
          <span className="icon">📁</span>
        </div>
        <div className="menu-item">
          <span className="icon">⚙️</span>
        </div>
      </aside>

      <footer className="footer">
        <button className="footer-side-btn" title="پشتیبانی">
          <span>💬</span>
        </button>

        <div className="chat-section">
          <button className="chat-action-btn" title="ضمیمه فایل">
            <span>📎</span>
          </button>
          
          <input 
            type="text" 
            className="chat-input" 
            placeholder="پیام خود را بنویسید..."
          />
          
          <button className="chat-action-btn" title="ارسال صوت">
            <span>🎤</span>
          </button>
          
          <button className="chat-send-btn" title="ارسال">
            <span>➤</span>
          </button>
        </div>

        {/* Weather Button - Opens in Tab */}
        <button 
          className="footer-side-btn" 
          title="هواشناسی"
          onClick={() => openTab('weather', 'هواشناسی', '🌤️', <WeatherContent />)}
        >
          <span>👥</span>
        </button>
      </footer>
    </div>
  );
}
