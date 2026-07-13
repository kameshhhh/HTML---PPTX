import React, { useState, useCallback } from 'react';
import { HtmlEditor } from './components/HtmlEditor';
import { SlidePanel } from './components/SlidePanel';
import { SlidePreviewModal } from './components/SlidePreviewModal';
import { EditSlideModal } from './components/EditSlideModal';
import { ToastContainer } from './components/Toast';
import { useSlides } from './hooks/useSlides';
import { useToast } from './hooks/useToast';
import { api } from './utils/api';
import { Slide } from './types';
import './App.css';

function App() {
  const {
    slides,
    loading,
    error,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    clearSlides,
    clearError,
  } = useSlides();

  const { toasts, removeToast, success, error: showError } = useToast();
  const [previewSlide, setPreviewSlide] = useState<Slide | null>(null);
  const [editSlide, setEditSlide] = useState<Slide | null>(null);
  const [exporting, setExporting] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState('My Presentation');

  // Surface API errors as toasts
  React.useEffect(() => {
    if (error) {
      showError(error);
      clearError();
    }
  }, [error, showError, clearError]);

  const handleConvertToSlide = useCallback(async (html: string, title?: string) => {
    const slide = await addSlide(html, title);
    if (slide) {
      success(`Slide "${slide.title}" added!`);
    }
  }, [addSlide, success]);

  const handleEdit = useCallback((slide: Slide) => {
    setEditSlide(slide);
  }, []);

  const handleSaveEdit = useCallback(async (
    id: string,
    updates: { html?: string; title?: string }
  ) => {
    const updated = await updateSlide(id, updates);
    if (updated) {
      success('Slide updated');
    }
  }, [updateSlide, success]);

  const handleDelete = useCallback(async (id: string) => {
    const ok = await deleteSlide(id);
    if (ok) success('Slide deleted');
  }, [deleteSlide, success]);

  const handleClearAll = useCallback(async () => {
    if (slides.length === 0) return;
    if (!window.confirm(`Delete all ${slides.length} slides? This cannot be undone.`)) return;
    await clearSlides();
    success('All slides cleared');
  }, [slides.length, clearSlides, success]);

  const handleExport = useCallback(async () => {
    if (slides.length === 0) return;
    setExporting(true);
    try {
      const blob = await api.exportPPTX({
        slideIds: slides.map(s => s.id),
        presentationTitle,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${presentationTitle.replace(/[^a-z0-9]/gi, '_') || 'presentation'}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      success(`"${presentationTitle}.pptx" downloaded!`);
    } catch (err) {
      showError('Export failed. Please try again.');
      console.error(err);
    } finally {
      setExporting(false);
    }
  }, [slides, presentationTitle, success, showError]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span className="logo-text">HTML<span className="logo-arrow">→</span>PowerPoint</span>
        </div>
        <div className="app-header-center">
          <input
            className="presentation-title-input"
            type="text"
            value={presentationTitle}
            onChange={e => setPresentationTitle(e.target.value)}
            placeholder="Presentation title..."
            maxLength={100}
          />
        </div>
        <div className="app-header-right">
          <span className="header-slide-count">
            {slides.length} slide{slides.length !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      {/* Main layout */}
      <main className="app-main">
        <div className="main-editor">
          <HtmlEditor
            onConvertToSlide={handleConvertToSlide}
            loading={loading}
          />
        </div>
        <div className="main-slides">
          <SlidePanel
            slides={slides}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPreview={setPreviewSlide}
            onReorder={reorderSlides}
            onExport={handleExport}
            onClear={handleClearAll}
            exporting={exporting}
            loading={loading}
          />
        </div>
      </main>

      {/* Modals */}
      <SlidePreviewModal
        slide={previewSlide}
        slides={slides}
        onClose={() => setPreviewSlide(null)}
        onNavigate={setPreviewSlide}
      />
      <EditSlideModal
        slide={editSlide}
        onClose={() => setEditSlide(null)}
        onSave={handleSaveEdit}
        loading={loading}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
