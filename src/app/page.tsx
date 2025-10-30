'use client';

export default function Home() {
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
      </main>

      <aside className="right-sidebar">
        <div className="menu-item">
          <span className="icon">📌</span>
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
        <div className="footer-side">
          <button className="footer-btn">
            <span className="icon">💬</span>
            <span className="label">پشتیبانی</span>
          </button>
        </div>

        <div className="footer-center">
          <button className="chat-trigger">
            <span className="icon">💬</span>
            <span className="label">چت</span>
          </button>
          <div className="chat-quick-actions">
            <button className="quick-btn" title="چت با AI">🤖</button>
            <button className="quick-btn" title="ارسال صوت">🎤</button>
            <button className="quick-btn" title="ارسال فایل">📎</button>
            <button className="quick-btn" title="چت گروهی">👥</button>
          </div>
        </div>

        <div className="footer-side">
          <button className="footer-btn">
            <span className="icon">👥</span>
            <span className="label">اجتماعی</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
