'use client';

import { useState, useEffect } from 'react';
import './todo-modal.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoModal({ isOpen, onClose }: TodoModalProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
    if (todos.length === 1) {
      localStorage.removeItem('todos');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content todo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✓ لیست وظایف</h3>
        </div>

        <div className="modal-body">
          {/* Stats */}
          <div className="todo-stats">
            <div className="stat">
              <span className="stat-value">{totalCount}</span>
              <span className="stat-label">کل</span>
            </div>
            <div className="stat">
              <span className="stat-value">{completedCount}</span>
              <span className="stat-label">انجام شده</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalCount - completedCount}</span>
              <span className="stat-label">باقیمانده</span>
            </div>
          </div>

          {/* Add Todo */}
          <div className="todo-input-section">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="وظیفه جدید اضافه کنید..."
              className="todo-input"
            />
            <button onClick={addTodo} className="btn-add">
              +
            </button>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>هنوز وظیفه‌ای ندارید</p>
                <p className="empty-hint">یک وظیفه اضافه کنید</p>
              </div>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <button
                    className="todo-checkbox"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? '✓' : ''}
                  </button>
                  <span className="todo-text">{todo.text}</span>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Path: src/components/TodoModal.tsx
