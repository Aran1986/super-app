'use client';

import { useState, useEffect } from 'react';

export default function ClientApp() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weather] = useState({ temp: '24', condition: '☀️' });
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [todos, setTodos] = useState<Array<{id: number, text: string, done: boolean}>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [notes, setNotes] = useState<Array<{id: number, title: string, content: string}>>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

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

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const closeTab = () => {
    setActiveTab(null);
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
          <button className="header-btn" onClick={() => openTab('todo')}>📝</button>
          <button className="header-btn notif">🔔</button>
          <button className="header-btn wallet">
            <span>💳</span>
            <span>کیف پول</span>
          </button>
          <button className="header-btn avatar" onClick={() => setShowProfile(!showProfile)}>AR</button>
          
          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar">AR</div>
                <div>
                  <h3>علیرضا رحیمی</h3>
                  <p>alireza@example.com</p>
                </div>
              </div>
              <div className="profile-menu">
                <button>⚙️ تنظیمات</button>
                <button>👤 پروفایل</button>
                <button>🔐 امنیت</button>
                <button className="logout">🚪 خروج</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <aside className="left-sidebar">
        <div className="menu-item active">
          <span className="icon">🏠</span>
          <span className="text">خانه</span>
        </div>
        <div className="menu-item" onClick={() => openTab('finance')}>
          <span className="icon">💰</span>
          <span className="text">مالی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('health')}>
          <span className="icon">🏥</span>
          <span className="text">سلامت</span>
        </div>
        <div className="menu-item" onClick={() => openTab('social')}>
          <span className="icon">👥</span>
          <span className="text">اجتماعی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('market')}>
          <span className="icon">🛒</span>
          <span className="text">بازار</span>
        </div>
        <div className="menu-item" onClick={() => openTab('education')}>
          <span className="icon">📚</span>
          <span className="text">آموزش</span>
        </div>
        <div className="menu-item" onClick={() => openTab('entertainment')}>
          <span className="icon">🎬</span>
          <span className="text">سرگرمی</span>
        </div>
        <div className="menu-item" onClick={() => openTab('travel')}>
          <span className="icon">✈️</span>
          <span className="text">سفر</span>
        </div>
        <div className="menu-item" onClick={() => openTab('business')}>
          <span className="icon">💼</span>
          <span className="text">کسب‌وکار</span>
        </div>
        <div className="menu-item" onClick={() => openTab('iot')}>
          <span className="icon">🔌</span>
          <span className="text">IoT</span>
        </div>
        <div className="menu-item" onClick={() => openTab('ai')}>
          <span className="icon">🤖</span>
          <span className="text">AI</span>
        </div>
      </aside>

      <main className="main-screen">
        {activeTab === null && (
          <div className="welcome-section">
            <h1>خوش آمدید به Super App</h1>
            <p>سوپر اپ ماژولار Web3 شما</p>
            
            <div className="modules-grid">
              <div className="module-card" onClick={() => openTab('finance')}>
                <div className="module-icon">💰</div>
                <h3>خدمات مالی</h3>
                <p>کیف پول، صرافی، P2P و بیشتر</p>
              </div>
              
              <div className="module-card" onClick={() => openTab('health')}>
                <div className="module-icon">🏥</div>
                <h3>سلامت</h3>
                <p>پرونده پزشکی، پزشک آنلاین، داروخانه</p>
              </div>
              
              <div className="module-card" onClick={() => openTab('social')}>
                <div className="module-icon">👥</div>
                <h3>اجتماعی</h3>
                <p>پیام‌رسانی، شبکه اجتماعی، انجمن‌ها</p>
              </div>
              
              <div className="module-card" onClick={() => openTab('market')}>
                <div className="module-icon">🛒</div>
                <h3>بازار</h3>
                <p>تجارت الکترونیک، NFT، خدمات</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'todo' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>📝 لیست کارها</h2>
              <button className="tab-close" onClick={closeTab}>✕</button>
            </div>
            
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

        {activeTab === 'weather' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>🌤️ هواشناسی</h2>
              <button className="tab-close" onClick={closeTab}>✕</button>
            </div>
            <div style={{padding: '40px', textAlign: 'center'}}>
              <div style={{fontSize: '80px', marginBottom: '20px'}}>{weather.condition}</div>
              <div style={{fontSize: '48px', fontWeight: 'bold'}}>{weather.temp}°C</div>
              <div style={{fontSize: '18px', color: '#64748b', marginTop: '10px'}}>نورنبرگ، آلمان</div>
            </div>
          </div>
        )}

        {activeTab && activeTab !== 'todo' && activeTab !== 'weather' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>{activeTab}</h2>
              <button className="tab-close" onClick={closeTab}>✕</button>
            </div>
            <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
              <p>محتوای {activeTab} به زودی اضافه می‌شود</p>
            </div>
          </div>
        )}
      </main>

      <aside className="right-sidebar">
        <div className="menu-item" onClick={() => setShowNotes(!showNotes)}>
          <span className="icon">📝</span>
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
          <div className="footer-time" onClick={() => openTab('clock')} style={{cursor: 'pointer'}}>⏰ {currentTime}</div>
          <div className="footer-date" onClick={() => openTab('calendar')} style={{cursor: 'pointer'}}>📅 {currentDate}</div>
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
          <button className="footer-btn" title="تماس ویدیویی" onClick={() => openTab('video-call')}>📹</button>
          <div className="footer-weather" onClick={() => openTab('weather')} style={{cursor: 'pointer'}}>{weather.condition} {weather.temp}°</div>
        </div>
      </footer>

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
