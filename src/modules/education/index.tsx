// src/modules/education/index.tsx
'use client';

export default function EducationModule() {
  return (
    <div className="module-card">
      <div className="module-icon">📚</div>
      <h3>آموزش</h3>
      <p>دوره‌های آموزشی، کتاب، آزمون</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>بخش‌ها:</h4>
        <ul>
          <li>📖 کتاب‌های الکترونیکی</li>
          <li>🎓 دوره‌های آنلاین</li>
          <li>✍️ آزمون و تمرین</li>
          <li>👨‍🏫 استاد خصوصی</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/education/index.tsx
