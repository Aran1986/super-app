// src/modules/entertainment/index.tsx
'use client';

export default function EntertainmentModule() {
  return (
    <div className="module-card">
      <div className="module-icon">🎬</div>
      <h3>سرگرمی</h3>
      <p>محتوای سرگرمی، فیلم، سریال، بازی</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>دسته‌بندی‌ها:</h4>
        <ul>
          <li>🎥 فیلم و سریال</li>
          <li>🎮 بازی</li>
          <li>📺 پادکست</li>
          <li>🎭 تئاتر</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/entertainment/index.tsx
