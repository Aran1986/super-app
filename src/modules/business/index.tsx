// src/modules/business/index.tsx
'use client';

export default function BusinessModule() {
  return (
    <div className="module-card">
      <div className="module-icon">💼</div>
      <h3>کسب‌وکار</h3>
      <p>ابزارهای مدیریت کسب‌وکار</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>ابزارها:</h4>
        <ul>
          <li>📊 گزارشات مالی</li>
          <li>👥 مدیریت تیم</li>
          <li>📈 فروش و CRM</li>
          <li>📝 قراردادها</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/business/index.tsx
