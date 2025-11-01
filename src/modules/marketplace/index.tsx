// src/modules/marketplace/index.tsx
'use client';

export default function MarketplaceModule() {
  return (
    <div className="module-card">
      <div className="module-icon">🛒</div>
      <h3>بازار</h3>
      <p>تجارت الکترونیک، NFT، خدمات</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>دسته‌ها:</h4>
        <ul>
          <li>🛍️ خرید محصولات</li>
          <li>🎨 NFT Marketplace</li>
          <li>🤝 خدمات فریلنسری</li>
          <li>📦 انبار و لجستیک</li>
        </ul>
      </div>
    </div>
  );
}

// Location: src/modules/marketplace/index.tsx
