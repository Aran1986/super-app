'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  // State for Footer
  const [currentTime, setCurrentTime] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [use24Hour, setUse24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [weather, setWeather] = useState({
    temp: null,
    condition: 'بارگذاری...',
    icon: '⏳',
    humidity: 0,
    wind: 0,
    pressure: 0,
    visibility: 0,
    feels_like: 0,
    forecast: []
  });
  const [loading, setLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Update time every second
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather on mount
  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000); // 10 min
    return () => clearInterval(weatherInterval);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherError(null);
    
    try {
      const lat = 49.4521;
      const lon = 11.0767;
      const API_KEY = 'YOUR_API_KEY_HERE'; // ⚠️ جایگزین کنید
      
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`
      );
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`
      );

      const getWeatherIcon = (code) => {
        if (code >= 200 && code < 300) return '⛈️';
        if (code >= 300 && code < 400) return '🌦️';
        if (code >= 500 && code < 600) return '🌧️';
        if (code >= 600 && code < 700) return '❄️';
        if (code >= 700 && code < 800) return '🌫️';
        if (code === 800) return '☀️';
        if (code > 800) return '☁️';
        return '🌤️';
      };

      const dailyForecasts = [];
      const processedDates = new Set();
      
      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toLocaleDateString('fa-IR');
        
        if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
          processedDates.add(dateStr);
          dailyForecasts.push({
            day: date.toLocaleDateString('fa-IR', { weekday: 'long' }),
            temp: Math.round(item.main.temp),
            icon: getWeatherIcon(item.weather[0].id),
            condition: item.weather[0].description
          });
        }
      });

      setWeather({
        temp: Math.round(currentResponse.data.main.temp),
        condition: currentResponse.data.weather[0].description,
        icon: getWeatherIcon(currentResponse.data.weather[0].id),
        humidity: currentResponse.data.main.humidity,
        wind: Math.round(currentResponse.data.wind.speed * 3.6),
        pressure: currentResponse.data.main.pressure,
        visibility: Math.round(currentResponse.data.visibility / 1000),
        feels_like: Math.round(currentResponse.data.main.feels_like),
        forecast: dailyForecasts
      });
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      setWeatherError('خطا در دریافت هوا');
      
      // Fallback data
      setWeather({
        temp: 22,
        condition: 'آفتابی',
        icon: '☀️',
        humidity: 65,
        wind: 12,
        pressure: 1013,
        visibility: 10,
        feels_like: 20,
        forecast: [
          { day: 'دوشنبه', temp: 20, icon: '🌤️', condition: 'نیمه ابری' },
          { day: 'سه‌شنبه', temp: 22, icon: '☀️', condition: 'آفتابی' },
          { day: 'چهارشنبه', temp: 19, icon: '🌧️', condition: 'بارانی' },
          { day: 'پنج‌شنبه', temp: 21, icon: '⛅', condition: 'کمی ابری' },
          { day: 'جمعه', temp: 23, icon: '☀️', condition: 'آفتابی' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24Hour
    };
    if (showSeconds) options.second = '2-digit';
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  };

  const formatPersianDate = (date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
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

      {/* FOOTER با ساعت و هواشناسی */}
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
          
          {/* Time Widget */}
          <button 
            onClick={() => setShowTimeModal(true)}
            className="footer-widget time-widget"
            title="ساعت و تاریخ"
          >
            <span className="widget-icon">🕐</span>
            <span className="widget-text">{currentTime ? formatTime(currentTime) : '--:--:--'}</span>
          </button>

          {/* Weather Widget */}
          <button
            onClick={() => setShowWeatherModal(true)}
            className="footer-widget weather-widget"
            title="وضعیت هوا"
          >
            <span className="widget-icon">{loading ? '⏳' : weather.icon}</span>
            <span className="widget-text">
              {weather.temp ? `${weather.temp}°C` : '...'}
            </span>
          </button>
          
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

      {/* Time Modal */}
      {showTimeModal && (
        <div 
          className="modal-overlay"
          onClick={() => setShowTimeModal(false)}
        >
          <div 
            className="modal-content time-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>🕐 ساعت و تاریخ</h3>
              <button onClick={() => setShowTimeModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="time-display">
                <div className="time-large">{currentTime ? formatTime(currentTime) : '--:--:--'}</div>
                <div className="date-persian">{currentTime ? formatPersianDate(currentTime) : 'در حال بارگذاری...'}</div>
                <div className="timezone">منطقه زمانی: تهران (UTC+3:30)</div>
              </div>

              <div className="settings-group">
                <div 
                  className="setting-item"
                  onClick={() => setUse24Hour(!use24Hour)}
                >
                  <span>فرمت ۲۴ ساعته</span>
                  <div className={`toggle ${use24Hour ? 'active' : ''}`}>
                    <div className="toggle-thumb"></div>
                  </div>
                </div>
                
                <div 
                  className="setting-item"
                  onClick={() => setShowSeconds(!showSeconds)}
                >
                  <span>نمایش ثانیه</span>
                  <div className={`toggle ${showSeconds ? 'active' : ''}`}>
                    <div className="toggle-thumb"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Modal */}
      {showWeatherModal && (
        <div 
          className="modal-overlay"
          onClick={() => setShowWeatherModal(false)}
        >
          <div 
            className="modal-content weather-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>🌤️ وضعیت هوا</h3>
              <div className="header-actions">
                <button onClick={fetchWeather} disabled={loading}>
                  {loading ? '⏳' : '🔄'}
                </button>
                <button onClick={() => setShowWeatherModal(false)}>✕</button>
              </div>
            </div>
            
            <div className="modal-body">
              {weatherError && (
                <div className="weather-error">
                  {weatherError} - نمایش داده نمونه
                </div>
              )}

              <div className="weather-current">
                <div className="weather-icon-big">{weather.icon}</div>
                <div className="weather-temp-big">{weather.temp}°C</div>
                <div className="weather-feels">احساس: {weather.feels_like}°C</div>
                <div className="weather-condition">{weather.condition}</div>
                <div className="weather-location">📍 نورنبرگ، آلمان</div>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <span className="detail-label">رطوبت</span>
                  <span className="detail-value">{weather.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💨</span>
                  <span className="detail-label">باد</span>
                  <span className="detail-value">{weather.wind} km/h</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🌡️</span>
                  <span className="detail-label">فشار</span>
                  <span className="detail-value">{weather.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👁️</span>
                  <span className="detail-label">دید</span>
                  <span className="detail-value">{weather.visibility} km</span>
                </div>
              </div>

              {weather.forecast.length > 0 && (
                <div className="weather-forecast">
                  <h4>پیش‌بینی ۵ روز</h4>
                  {weather.forecast.map((day, i) => (
                    <div key={i} className="forecast-item">
                      <span className="forecast-day">{day.day}</span>
                      <span className="forecast-icon">{day.icon}</span>
                      <span className="forecast-temp">{day.temp}°C</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Path: src/app/page.tsx
