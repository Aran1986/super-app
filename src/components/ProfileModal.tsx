'use client';

import { useState, useEffect } from 'react';
import './profile-modal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [profile, setProfile] = useState({
    name: 'کاربر مهمان',
    email: '',
    phone: '',
    avatar: '👤',
    bio: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    // بارگذاری از localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfile(data);
      setTempProfile(data);
    }
  }, []);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const avatarOptions = ['👤', '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '🧔', '👱‍♀️', '👨‍🦰', '👩‍🦰'];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>👤 پروفایل کاربری</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Avatar */}
          <div className="profile-avatar-section">
            {isEditing ? (
              <div className="avatar-picker">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    className={`avatar-option ${tempProfile.avatar === emoji ? 'active' : ''}`}
                    onClick={() => setTempProfile({ ...tempProfile, avatar: emoji })}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="profile-avatar-display">{profile.avatar}</div>
            )}
          </div>

          {/* Fields */}
          <div className="profile-fields">
            <div className="profile-field">
              <label>نام</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  placeholder="نام خود را وارد کنید"
                />
              ) : (
                <div className="field-value">{profile.name}</div>
              )}
            </div>

            <div className="profile-field">
              <label>ایمیل</label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  placeholder="example@email.com"
                />
              ) : (
                <div className="field-value">{profile.email || 'وارد نشده'}</div>
              )}
            </div>

            <div className="profile-field">
              <label>تلفن</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                  placeholder="09123456789"
                />
              ) : (
                <div className="field-value">{profile.phone || 'وارد نشده'}</div>
              )}
            </div>

            <div className="profile-field">
              <label>درباره من</label>
              {isEditing ? (
                <textarea
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  placeholder="چند خط درباره خودتان بنویسید..."
                  rows={3}
                />
              ) : (
                <div className="field-value">{profile.bio || 'وارد نشده'}</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>
                  ✓ ذخیره
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  ✕ انصراف
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                ✏️ ویرایش
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Path: src/components/ProfileModal.tsx
