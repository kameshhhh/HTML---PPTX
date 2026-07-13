import React, { useState, useRef, useCallback } from 'react';
import { EXAMPLE_TEMPLATES } from '../utils/templates';

interface HtmlEditorProps {
  onConvertToSlide: (html: string, title?: string) => Promise<void>;
  loading: boolean;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({ onConvertToSlide, loading }) => {
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [previewMode, setPreviewMode] = useState<'code' | 'preview'>('code');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleConvert = useCallback(async () => {
    if (!html.trim()) return;
    await onConvertToSlide(html, title || undefined);
    setHtml('');
    setTitle('');
  }, [html, title, onConvertToSlide]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleConvert();
    }
    // Tab support in textarea
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
  }, [handleConvert, html]);

  const applyTemplate = (templateHtml: string, templateName: string) => {
    setHtml(templateHtml);
    setTitle(title || templateName);
    setShowTemplates(false);
    setPreviewMode('code');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      setHtml(content);
      setTitle(title || file.name.replace(/\.html?$/i, ''));
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h2 className="editor-title">HTML Editor</h2>
        <div className="editor-header-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Templates
          </button>
          <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload HTML
            <input
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      {showTemplates && (
        <div className="templates-grid">
          {EXAMPLE_TEMPLATES.map((tpl) => (
            <button
              key={tpl.name}
              className="template-card"
              onClick={() => applyTemplate(tpl.html, tpl.name)}
            >
              <span className="template-name">{tpl.name}</span>
              <span className="template-desc">{tpl.description}</span>
            </button>
          ))}
        </div>
      )}

      <div className="slide-title-row">
        <input
          className="slide-title-input"
          type="text"
          placeholder="Slide title (optional)..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={120}
        />
      </div>

      <div className="code-preview-tabs">
        <button
          className={`tab-btn ${previewMode === 'code' ? 'active' : ''}`}
          onClick={() => setPreviewMode('code')}
        >
          Code
        </button>
        <button
          className={`tab-btn ${previewMode === 'preview' ? 'active' : ''}`}
          onClick={() => setPreviewMode('preview')}
          disabled={!html.trim()}
        >
          Preview
        </button>
      </div>

      {previewMode === 'code' ? (
        <textarea
          ref={textareaRef}
          className="html-textarea"
          value={html}
          onChange={e => setHtml(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Paste your HTML here...\n\nExample:\n<div style="background: #1a1a2e; padding: 40px;">\n  <h1 style="color: white;">My Slide Title</h1>\n  <p style="color: #a8b2d8;">Slide content goes here</p>\n</div>`}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      ) : (
        <div className="html-preview-frame">
          <iframe
            title="HTML Preview"
            srcDoc={html}
            sandbox="allow-same-origin"
            className="preview-iframe"
          />
        </div>
      )}

      <div className="editor-footer">
        <span className="char-count">{html.length.toLocaleString()} characters</span>
        <div className="editor-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setHtml(''); setTitle(''); }}
            disabled={!html}
          >
            Clear
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConvert}
            disabled={!html.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Converting...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Convert to Slide
                <kbd>⌘↵</kbd>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
