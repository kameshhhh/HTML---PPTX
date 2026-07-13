import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '../types';

interface EditSlideModalProps {
  slide: Slide | null;
  onClose: () => void;
  onSave: (id: string, updates: { html?: string; title?: string }) => Promise<void>;
  loading: boolean;
}

export const EditSlideModal: React.FC<EditSlideModalProps> = ({
  slide,
  onClose,
  onSave,
  loading,
}) => {
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [previewMode, setPreviewMode] = useState<'code' | 'preview'>('code');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (slide) {
      setHtml(slide.html);
      setTitle(slide.title);
    }
  }, [slide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!slide) return null;

  const handleSave = async () => {
    await onSave(slide.id, { html, title });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = html.substring(0, start) + '  ' + html.substring(end);
      setHtml(newVal);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      }, 0);
    }
  };

  const hasChanges = html !== slide.html || title !== slide.title;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-container--wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-slide-title">Edit Slide</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-edit-body">
          <input
            className="slide-title-input"
            type="text"
            placeholder="Slide title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={120}
          />

          <div className="code-preview-tabs">
            <button
              className={`tab-btn ${previewMode === 'code' ? 'active' : ''}`}
              onClick={() => setPreviewMode('code')}
            >Code</button>
            <button
              className={`tab-btn ${previewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setPreviewMode('preview')}
            >Preview</button>
          </div>

          {previewMode === 'code' ? (
            <textarea
              ref={textareaRef}
              className="html-textarea html-textarea--modal"
              value={html}
              onChange={e => setHtml(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          ) : (
            <div className="html-preview-frame html-preview-frame--modal">
              <iframe
                title="Edit preview"
                srcDoc={html}
                sandbox="allow-same-origin"
                className="preview-iframe"
              />
            </div>
          )}
        </div>

        <div className="modal-edit-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!hasChanges || loading}
          >
            {loading ? (
              <><span className="spinner" /> Saving...</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Save Changes <kbd>⌘S</kbd></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
