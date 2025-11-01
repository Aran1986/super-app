'use client';

import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Note {
  id: number;
  title: string;
  content: string;
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
    const existingTab = tabs.find(t => t.title === title);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }
    
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
          onClick={() => openTab('پروفایل', '👤', <ProfilePanel />)}
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
      <div className="menu-item" onClick={() => openTab('تودولیست', '✓', <TodoList />)}>
        <span className="icon">✓</span>
        <span className="text">کارها</span>
      </div>
      <div className="menu-item" onClick={() => openTab('یادداشت‌ها', '📝', <NotesPanel />)}>
        <span className="icon">📝</span>
        <span className="text">یادداشت</span>
      </div>
      <div className="menu-item" onClick={() => openTab('تنظیمات', '⚙️', <SettingsContent />)}>
        <span className="icon">⚙️</span>
        <span className="text">تنظیمات</span>
      </div>
    </aside>
  );
}

function Footer({ openTab }: { openTab: (title: string, icon: string, component: React.ReactNode) => void }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <WeatherWidget />
        <div className="datetime-widget" onClick={() => openTab('تقویم', '📅', <CalendarWidget />)}>
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
      </div>
      
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
      
      <div className="footer-right">
        <button 
          className="jitsi-btn"
          onClick={() => openTab('تماس ویدیویی', '📹', <JitsiMeet />)}
          title="Jitsi Meet - تماس ویدیویی"
        >
          📹
        </button>
      </div>
    </footer>
  );
}

// ===== WIDGETS =====

function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: 22, condition: '☀️', city: 'تهران' });

  return (
    <div className="weather-widget">
      <span className="weather-icon">{weather.condition}</span>
      <span className="weather-temp">{weather.temp}°</span>
      <span className="weather-city">{weather.city}</span>
    </div>
  );
}

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();
    const isSelected = day === selectedDate.getDate() &&
                       currentDate.getMonth() === selectedDate.getMonth() &&
                       currentDate.getFullYear() === selectedDate.getFullYear();
    
    days.push(
      <div 
        key={day} 
        className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
      >
        {day}
      </div>
    );
  }

  const monthNames = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'می', 'ژوئن', 'ژولای', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
  const dayNames = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];

  return (
    <div className="module-content">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>❮</button>
          <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>❯</button>
        </div>
        <div className="calendar-weekdays">
          {dayNames.map(day => <div key={day} className="weekday">{day}</div>)}
        </div>
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    </div>
  );
}

function JitsiMeet() {
  const [roomName, setRoomName] = useState('');
  const [isInMeeting, setIsInMeeting] = useState(false);

  const startMeeting = () => {
    if (roomName.trim()) {
      setIsInMeeting(true);
    }
  };

  return (
    <div className="module-content">
      {!isInMeeting ? (
        <div className="jitsi-setup">
          <h3>تماس ویدیویی Jitsi Meet</h3>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="نام اتاق را وارد کنید"
            className="jitsi-input"
          />
          <button onClick={startMeeting} className="jitsi-start-btn">
            شروع جلسه
          </button>
        </div>
      ) : (
        <div className="jitsi-frame">
          <iframe
            src={`https://meet.jit.si/${roomName}`}
            allow="camera; microphone; fullscreen; display-capture"
            style={{ width: '100%', height: '600px', border: 'none', borderRadius: '12px' }}
          ></iframe>
          <button onClick={() => setIsInMeeting(false)} className="jitsi-leave-btn">
            خروج از جلسه
          </button>
        </div>
      )}
    </div>
  );
}

// ===== FUNCTIONAL COMPONENTS =====

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'مطالعه کتاب', completed: false },
    { id: 2, text: 'ورزش صبحگاهی', completed: true },
    { id: 3, text: 'جلسه تیمی', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="module-content">
      <div className="todo-container">
        <div className="todo-input-section">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="کار جدید اضافه کنید..."
            className="todo-input"
          />
          <button onClick={addTask} className="todo-add-btn">+</button>
        </div>
        
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className="task-text">{task.text}</span>
              <button onClick={() => deleteTask(task.id)} className="task-delete">×</button>
            </div>
          ))}
        </div>
        
        <div className="todo-stats">
          <span>همه: {tasks.length}</span>
          <span>تکمیل شده: {tasks.filter(t => t.completed).length}</span>
          <span>باقیمانده: {tasks.filter(t => !t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}

function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'یادداشت اول', content: 'محتوای یادداشت اول...' },
    { id: 2, title: 'ایده جدید', content: 'یک ایده جالب برای پروژه' },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: 'یادداشت جدید',
      content: ''
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  const saveNote = () => {
    if (selectedNote) {
      setNotes(notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title: editTitle, content: editContent }
          : note
      ));
      setSelectedNote({ ...selectedNote, title: editTitle, content: editContent });
      setIsEditing(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="module-content">
      <div className="notes-container">
        <div className="notes-sidebar-panel">
          <button onClick={createNewNote} className="new-note-btn">+ یادداشت جدید</button>
          <div className="notes-list">
            {notes.map(note => (
              <div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNote(note);
                  setIsEditing(false);
                }}
              >
                <h4>{note.title}</h4>
                <p>{note.content.substring(0, 50)}...</p>
                <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="note-delete">×</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="note-editor">
          {selectedNote ? (
            isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="note-title-input"
                  placeholder="عنوان یادداشت"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="note-content-input"
                  placeholder="محتوای یادداشت..."
                />
                <div className="note-actions">
                  <button onClick={saveNote} className="save-btn">ذخیره</button>
                  <button onClick={() => setIsEditing(false)} className="cancel-btn">انصراف</button>
                </div>
              </>
            ) : (
              <>
                <h2>{selectedNote.title}</h2>
                <p className="note-content">{selectedNote.content}</p>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditTitle(selectedNote.title);
                    setEditContent(selectedNote.content);
                  }}
                  className="edit-btn"
                >
                  ویرایش
                </button>
              </>
            )
          ) : (
            <div className="no-note-selected">
              <p>یک یادداشت انتخاب کنید یا یادداشت جدید ایجاد کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilePanel() {
  const [profile, setProfile] = useState({
    name: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '09121234567',
    bio: 'توسعه‌دهنده نرم‌افزار',
    avatar: 'AR'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const saveProfile = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  return (
    <div className="module-content">
      <div className="profile-container">
        <div className="profile-avatar-large">{profile.avatar}</div>
        
        {isEditing ? (
          <div className="profile-form">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="نام"
              className="profile-input"
            />
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              placeholder="ایمیل"
              className="profile-input"
            />
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              placeholder="تلفن"
              className="profile-input"
            />
            <textarea
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              placeholder="بیوگرافی"
              className="profile-textarea"
            />
            <div className="profile-actions">
              <button onClick={saveProfile} className="save-btn">ذخیره</button>
              <button onClick={() => { setIsEditing(false); setEditData(profile); }} className="cancel-btn">انصراف</button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
            <p className="profile-phone">{profile.phone}</p>
            <p className="profile-bio">{profile.bio}</p>
            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">ویرایش پروفایل</button>
          </div>
        )}
        
        <div className="profile-stats">
          <div className="stat-card">
            <span className="stat-number">12</span>
            <span className="stat-label">دنبال‌کننده</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">45</span>
            <span className="stat-label">دنبال‌شونده</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">8</span>
            <span className="stat-label">پست</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== OTHER CONTENT COMPONENTS =====

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

function NotificationsContent() {
  return (
    <div className="module-content">
      <div className="notifications-list">
        <div className="notification-item">
          <span className="notif-icon">💰</span>
          <div className="notif-content">
            <p className="notif-title">تراکنش جدید</p>
            <p className="notif-desc">واریز 100 دلار به حساب شما</p>
          </div>
        </div>
        <div className="notification-item">
          <span className="notif-icon">👥</span>
          <div className="notif-content">
            <p className="notif-title">دنبال‌کننده جدید</p>
            <p className="notif-desc">محمد احمدی شما را دنبال کرد</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="module-content">
      <div className="settings-sections">
        <div className="setting-item">
          <span>زبان</span>
          <select>
            <option>فارسی</option>
            <option>English</option>
          </select>
        </div>
        <div className="setting-item">
          <span>تم</span>
          <select>
            <option>روشن</option>
            <option>تاریک</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function FinancialContent() {
  return (
    <div className="module-content">
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
      <div className="ai-modules">
        <div className="sub-module-card">💬 چت AI</div>
        <div className="sub-module-card">🎨 تولید تصویر</div>
      </div>
    </div>
  );
}

// Location: src/components/ClientApp.tsx
