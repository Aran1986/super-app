'use client';

import { useState, useEffect } from 'react';

export default function ClientApp() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weather] = useState({ temp: '24', condition: '☀️' });
  const [tabs, setTabs] = useState<Array<{id: string, name: string, icon: string}>>([
    { id: 'home', name: 'خانه', icon: '🏠' }
  ]);
  const [activeTabId, setActiveTabId] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [todos, setTodos] = useState<Array<{id: number, text: string, done: boolean}>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [notes, setNotes] = useState<Array<{id: number, title: string, content: string}>>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [profileData, setProfileData] = useState({
    name: 'علیرضا رحیمی',
    email: 'alireza@example.com',
    phone: '09123456789',
    wallet: '0x742d...5f8a',
    balance: '12.5 ETH',
    avatar: 'AR'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openTab = (tabId: string, tabName: string, tabIcon: string) => {
    const existingTab = tabs.find(tab => tab.id === tabId);
    if (existingTab) {
      setActiveTabId(tabId);
    } else {
      setTabs([...tabs, { id: tabId, name: tabName, icon: tabIcon }]);
      setActiveTabId(tabId);
    }
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (newTabs.length === 0) {
      setTabs([{ id: 'home', name: 'خانه', icon: '🏠' }]);
      setActiveTabId('home');
    } else {
      setTabs(newTabs);
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      setNotes([...notes, { id: Date.now(), ...newNote }]);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

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
          <button className="header-btn avatar" onClick={() => setShowProfile(!showProfile)}>{profileData.avatar}</button>
        </div>
      </header>

      {showProfile && (
        <>
          <div className="modal-overlay" onClick={() => setShowProfile(false)}></div>
          <div className="profile-modal">
            <button className="modal-close" onClick={() => setShowProfile(false)}>✕</button>
            
            <div className="profile-modal-header">
              <div className="profile-modal-avatar">{profileData.avatar}</div>
              <h2>{profileData.name}</h2>
              <p>{profileData.email}</p>
            </div>

            <div className="profile-modal-body">
              <div className="profile-section">
                <h3>💳 کیف پول</h3>
                <div className="profile-info-card">
                  <div className="info-row">
                    <span className="info-label">آدرس:</span>
                    <span className="info-value">{profileData.wallet}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">موجودی:</span>
                    <span className="info-value balance">{profileData.balance}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>📱 اطلاعات تماس</h3>
                <div className="profile-info-card">
                  <div className="info-row">
                    <span className="info-label">شماره تماس:</span>
                    <span className="info-value">{profileData.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ایمیل:</span>
                    <span className="info-value">{profileData.email}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>⚙️ تنظیمات</h3>
                <div className="profile-menu-list">
                  <button className="profile-menu-item">
                    <span>👤</span>
                    <span>ویرایش پروفایل</span>
                  </button>
                  <button className="profile-menu-item">
                    <span>🔐</span>
                    <span>امنیت و رمز عبور</span>
                  </button>
                  <button className="profile-menu-item">
                    <span>🔔</span>
                    <span>اعلان‌ها</span>
                  </button>
                  <button className="profile-menu-item">
                    <span>🌐</span>
                    <span>زبان و منطقه</span>
                  </button>
                  <button className="profile-menu-item danger">
                    <span>🚪</span>
                    <span>خروج از حساب</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <aside className="left-sidebar">
        <div className="menu-item active" onClick={() => openTab('home', 'خانه', '🏠')}>
          <span className="icon">🏠</span>
          <span className="text">خانه</span>
        </div>
        <div className="menu-item" onClick={() => openTab('finance', 'خدمات مالی', '💰')}>
          <span className="icon">💰</span>
          <span className="text">مالی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('health', 'سلامت', '🏥')}>
          <span className="icon">🏥</span>
          <span className="text">سلامت</span>
        </div>
        <div className="menu-item" onClick={() => openTab('social', 'اجتماعی', '👥')}>
          <span className="icon">👥</span>
          <span className="text">اجتماعی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('market', 'بازار', '🛒')}>
          <span className="icon">🛒</span>
          <span className="text">بازار</span>
        </div>
        <div className="menu-item" onClick={() => openTab('education', 'آموزش', '📚')}>
          <span className="icon">📚</span>
          <span className="text">آموزش</span>
        </div>
        <div className="menu-item" onClick={() => openTab('entertainment', 'سرگرمی', '🎬')}>
          <span className="icon">🎬</span>
          <span className="text">سرگرمی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('travel', 'سفر', '✈️')}>
          <span className="icon">✈️</span>
          <span className="text">سفر</span>
        </div>
        <div className="menu-item" onClick={() => openTab('business', 'کسب‌وکار', '💼')}>
          <span className="icon">💼</span>
          <span className="text">کسب‌وکار</span>
        </div>
        <div className="menu-item" onClick={() => openTab('iot', 'IoT', '🔌')}>
          <span className="icon">🔌</span>
          <span className="text">IoT</span>
        </div>
        <div className="menu-item" onClick={() => openTab('ai', 'AI', '🤖')}>
          <span className="icon">🤖</span>
          <span className="text">AI</span>
        </div>
      </aside>

      <main className="main-screen">
        <div className="tabs-bar">
          {tabs.map(tab => (
            <div 
              key={tab.id} 
              className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
              {tabs.length > 1 && (
                <button 
                  className="tab-close-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >✕</button>
              )}
            </div>
          ))}
        </div>

        <div className="tab-content-area">
          {activeTabId === 'home' && (
            <div className="welcome-section">
              <h1>خوش آمدید به Super App</h1>
              <p>سوپر اپ ماژولار Web3 شما</p>
              
              <div className="modules-grid">
                <div className="module-card" onClick={() => openTab('finance', 'خدمات مالی', '💰')}>
                  <div className="module-icon">💰</div>
                  <h3>خدمات مالی</h3>
                  <p>کیف پول، صرافی، P2P و بیشتر</p>
                </div>
                
                <div className="module-card" onClick={() => openTab('health', 'سلامت', '🏥')}>
                  <div className="module-icon">🏥</div>
                  <h3>سلامت</h3>
                  <p>پرونده پزشکی، پزشک آنلاین، داروخانه</p>
                </div>
                
                <div className="module-card" onClick={() => openTab('social', 'اجتماعی', '👥')}>
                  <div className="module-icon">👥</div>
                  <h3>اجتماعی</h3>
                  <p>پیام‌رسانی، شبکه اجتماعی، انجمن‌ها</p>
                </div>
                
                <div className="module-card" onClick={() => openTab('market', 'بازار', '🛒')}>
                  <div className="module-icon">🛒</div>
                  <h3>بازار</h3>
                  <p>تجارت الکترونیک، NFT، خدمات</p>
                </div>
              </div>
            </div>
          )}

          {activeTabId === 'todo' && (
            <div className="tab-content-inner">
              <h2>📝 لیست کارها</h2>
              
              <div className="todo-container">
                <div className="todo-input-section">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="کار جدید اضافه کنید..."
                    className="todo-input"
                  />
                  <button onClick={addTodo} className="todo-add-btn">➕ افزودن</button>
                </div>

                <div className="todo-list">
                  {todos.length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-icon">📋</span>
                      <p>هنوز کاری اضافه نشده است</p>
                    </div>
                  ) : (
                    todos.map(todo => (
                      <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span className="todo-text">{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)} className="todo-delete">🗑️</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTabId === 'weather' && (
            <div className="tab-content-inner">
              <h2>🌤️ هواشناسی</h2>
              <div style={{padding: '40px', textAlign: 'center'}}>
                <div style={{fontSize: '80px', marginBottom: '20px'}}>{weather.condition}</div>
                <div style={{fontSize: '48px', fontWeight: 'bold'}}>{weather.temp}°C</div>
                <div style={{fontSize: '18px', color: '#64748b', marginTop: '10px'}}>نورنبرگ، آلمان</div>
              </div>
            </div>
          )}

          {activeTabId === 'video-call' && (
            <div className="tab-content-inner" style={{padding: 0, height: '100%'}}>
              <iframe
                src="https://meet.jit.si/SuperAppMeeting"
                allow="camera; microphone; fullscreen; display-capture"
                style={{width: '100%', height: '600px', border: 'none', borderRadius: '16px'}}
              ></iframe>
            </div>
          )}

          {activeTabId !== 'home' && activeTabId !== 'todo' && activeTabId !== 'weather' && activeTabId !== 'video-call' && (
            <div className="tab-content-inner">
              <h2>{tabs.find(t => t.id === activeTabId)?.name}</h2>
              <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                <p>محتوای {tabs.find(t => t.id === activeTabId)?.name} به زودی اضافه می‌شود</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <aside className="right-sidebar">
        <div className="menu-item" onClick={() => setShowTodo(!showTodo)}>
          <span className="icon">📝</span>
          <span className="text">کارها</span>
        </div>
        <div className="menu-item" onClick={() => setShowNotes(!showNotes)}>
          <span className="icon">📒</span>
          <span className="text">یادداشت</span>
        </div>
        <div className="menu-item">
          <span className="icon">📌</span>
          <span className="text">پین</span>
        </div>
        <div className="menu-item">
          <span className="icon">⭐</span>
          <span className="text">مهم</span>
        </div>
        <div className="menu-item">
          <span className="icon">📁</span>
          <span className="text">فایل</span>
        </div>
        <div className="menu-item">
          <span className="icon">⚙️</span>
          <span className="text">تنظیم</span>
        </div>
      </aside>

      <footer className="footer">
        <div className="footer-left">
          <div className="footer-time" onClick={() => openTab('clock', 'ساعت', '⏰')} style={{cursor: 'pointer'}}>⏰ {currentTime}</div>
          <div className="footer-date" onClick={() => openTab('calendar', 'تقویم', '📅')} style={{cursor: 'pointer'}}>📅 {currentDate}</div>
        </div>

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

        <div className="footer-right">
          <button className="footer-btn" title="تماس ویدیویی" onClick={() => openTab('video-call', 'تماس تصویری', '📹')}>📹</button>
          <div className="footer-weather" onClick={() => openTab('weather', 'هواشناسی', '🌤️')} style={{cursor: 'pointer'}}>{weather.condition} {weather.temp}°</div>
        </div>
      </footer>

      {showTodo && (
        <div className="todo-panel">
          <div className="panel-header">
            <h3>📝 لیست کارها</h3>
            <button onClick={() => setShowTodo(false)}>✕</button>
          </div>
          
          <div className="todo-panel-input">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="کار جدید..."
            />
            <button onClick={addTodo}>➕</button>
          </div>

          <div className="todo-panel-list">
            {todos.length === 0 ? (
              <div className="empty-state-small">
                <span>📋</span>
                <p>لیست خالی است</p>
              </div>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`todo-panel-item ${todo.done ? 'done' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showNotes && (
        <div className="notes-panel">
          <div className="notes-header">
            <h3>📒 یادداشت‌ها</h3>
            <button onClick={() => setShowNotes(false)}>✕</button>
          </div>
          
          <div className="notes-input">
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="عنوان یادداشت..."
            />
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="متن یادداشت..."
              rows={4}
            />
            <button onClick={addNote}>➕ افزودن یادداشت</button>
          </div>

          <div className="notes-list">
            {notes.map(note => (
              <div key={note.id} className="note-item">
                <h4>{note.title || 'بدون عنوان'}</h4>
                <p>{note.content}</p>
                <button onClick={() => deleteNote(note.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Location: src/components/ClientApp.tsx
