// src/modules/iot/index.tsx
'use client';

export default function IoTModule() {
  return (
    <div className="module-card">
      <div className="module-icon">🔌</div>
      <h3>اینترنت اشیا</h3>
      <p>کنترل دستگاه‌های هوشمند</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>دستگاه‌ها:</h4>
        <ul>
          <li>💡 لامپ هوشمند</li>
          <li>🌡️ ترموستات</li>
          <li>📹 دوربین امنیتی</li>
          <li>🔒 قفل هوشمند</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/iot/index.tsx
