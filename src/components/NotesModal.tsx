'use client';

import { useState, useEffect } from 'react';
import './notes-modal.css';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['شخصی', 'کاری', 'خرید', 'ایده', 'مهم', 'سایر'];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function NotesModal({ isOpen, onClose }: NotesModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'شخصی',
    color: COLORS[0]
  });

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const createNote = () => {
    if (!formData.title.trim()) return;

    const note: Note = {
      id: Date.now(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      color: formData.color,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setNotes([note, ...notes]);
    resetForm();
  };

  const updateNote = () => {
    if (!editingNote || !formData.title.trim()) return;

    setNotes(notes.map(n => 
      n.id === editingNote.id 
        ? { ...n, ...formData, updatedAt: Date.now() }
        : n
    ));
    resetForm();
  };

  const deleteNote = (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      setNotes(notes.filter(n => n.id !== id));
      if (notes.length === 1) {
        localStorage.removeItem('notes');
      }
    }
  };

  const startEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      color: note.color
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'شخصی',
      color: COLORS[0]
    });
    setIsCreating(false);
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'همه' || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = notes.filter(n => n.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content notes-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📝 یادداشت‌ها</h3>
        </div>

        <div className="modal-body">
          {/* Search & Filter */}
          <div className="notes-controls">
            <div className="search-section">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 جستجو در یادداشت‌ها..."
                className="search-input"
              />
            </div>

            <div className="category-filters">
              <button
                className={`category-filter ${selectedCategory === 'همه' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('همه')}
              >
                همه ({notes.length})
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({categoryCounts[cat] || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Create/Edit Form */}
          {isCreating ? (
            <div className="note-form">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="عنوان یادداشت"
                className="note-title-input"
                autoFocus
              />

              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="متن یادداشت..."
                className="note-content-input"
                rows={6}
              />

              <div className="note-form-options">
                <div className="category-select">
                  <label>دسته:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="color-select">
                  <label>رنگ:</label>
                  <div className="color-options">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        className={`color-option ${formData.color === color ? 'active' : ''}`}
                        style={{ background: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="note-form-actions">
                <button className="btn-save" onClick={editingNote ? updateNote : createNote}>
                  {editingNote ? '✓ ذخیره' : '+ ایجاد'}
                </button>
                <button className="btn-cancel" onClick={resetForm}>
                  ✕ انصراف
                </button>
              </div>
            </div>
          ) : (
            <button className="btn-new-note" onClick={() => setIsCreating(true)}>
              + یادداشت جدید
            </button>
          )}

          {/* Notes Grid */}
          <div className="notes-grid">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>
                  {searchQuery || selectedCategory !== 'همه'
                    ? 'یادداشتی یافت نشد'
                    : 'هنوز یادداشتی ندارید'}
                </p>
                <p className="empty-hint">
                  {searchQuery || selectedCategory !== 'همه'
                    ? 'فیلتر یا جستجوی دیگری امتحان کنید'
                    : 'یک یادداشت جدید ایجاد کنید'}
                </p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{ borderLeftColor: note.color }}
                >
                  <div className="note-card-header">
                    <h4 className="note-card-title">{note.title}</h4>
                    <div className="note-card-actions">
                      <button
                        className="note-action-btn"
                        onClick={() => startEdit(note)}
                        title="ویرایش"
                      >
                        ✏️
                      </button>
                      <button
                        className="note-action-btn"
                        onClick={() => deleteNote(note.id)}
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="note-card-content">
                    {note.content || 'بدون محتوا'}
                  </p>

                  <div className="note-card-footer">
                    <span className="note-category" style={{ background: note.color }}>
                      {note.category}
                    </span>
                    <span className="note-date">
                      {new Date(note.updatedAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Path: src/components/NotesModal.tsx
