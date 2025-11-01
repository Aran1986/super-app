// src/modules/travel/index.tsx
'use client';

export default function TravelModule() {
  return (
    <div className="module-card">
      <div className="module-icon">✈️</div>
      <h3>سفر</h3>
      <p>رزرو هتل، پرواز، تور گردشگری</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>خدمات:</h4>
        <ul>
          <li>🏨 رزرو هتل</li>
          <li>✈️ بلیط هواپیما</li>
          <li>🚗 اجاره خودرو</li>
          <li>🗺️ تور و راهنما</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/travel/index.tsx
