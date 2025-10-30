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

        <button className="footer-side-btn" title="اجتماعی">
          <span>👥</span>
        </button>
      </footer>
    </div>
  );
}
