import React, { useEffect, useCallback } from 'react';
import { Slide } from '../types';

interface SlidePreviewModalProps {
  slide: Slide | null;
  slides: Slide[];
  onClose: () => void;
  onNavigate: (slide: Slide) => void;
}

export const SlidePreviewModal: React.FC<SlidePreviewModalProps> = ({
  slide,
  slides,
  onClose,
  onNavigate,
}) => {
  const currentIndex = slide ? slides.findIndex(s => s.id === slide.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(slides[currentIndex - 1]);
  }, [currentIndex, slides, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) onNavigate(slides[currentIndex + 1]);
  }, [currentIndex, slides, onNavigate]);

  useEffect(() => {
    if (!slide) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [slide, onClose, handlePrev, handleNext]);

  if (!slide) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-slide-num">Slide {currentIndex + 1} of {slides.length}</span>
            <h3 className="modal-slide-title">{slide.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close preview">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-preview">
          <iframe
            title={`Preview: ${slide.title}`}
            srcDoc={slide.html}
            sandbox="allow-same-origin"
            className="modal-iframe"
          />
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-ghost"
            onClick={handlePrev}
            disabled={currentIndex <= 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Previous
          </button>
          <div className="modal-dots">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`dot ${i === currentIndex ? 'dot--active' : ''}`}
                onClick={() => onNavigate(s)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="btn btn-ghost"
            onClick={handleNext}
            disabled={currentIndex >= slides.length - 1}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
