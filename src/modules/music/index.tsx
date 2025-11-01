// src/modules/music/index.tsx
'use client';

export default function MusicModule() {
  return (
    <div className="module-card">
      <div className="module-icon">🎵</div>
      <h3>موزیک</h3>
      <p>پخش موزیک، پادکست، پلی‌لیست</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>امکانات:</h4>
        <ul>
          <li>🎧 پخش آنلاین</li>
          <li>📻 رادیو</li>
          <li>🎼 پلی‌لیست شخصی</li>
          <li>🎤 هنرمندان</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/music/index.tsx
