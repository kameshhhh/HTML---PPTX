import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slide } from '../types';

interface SlideCardProps {
  slide: Slide;
  index: number;
  isActive?: boolean;
  onEdit: (slide: Slide) => void;
  onDelete: (id: string) => void;
  onPreview: (slide: Slide) => void;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  index,
  isActive,
  onEdit,
  onDelete,
  onPreview,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(slide.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`slide-card ${isActive ? 'slide-card--active' : ''} ${isDragging ? 'slide-card--dragging' : ''}`}
    >
      <div className="slide-card-header">
        <div
          className="drag-handle"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
          </svg>
        </div>
        <span className="slide-number">{index + 1}</span>
        <span className="slide-title-label" title={slide.title}>{slide.title}</span>
        <div className="slide-card-actions">
          <button
            className="icon-btn"
            onClick={() => onPreview(slide)}
            title="Preview slide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button
            className="icon-btn"
            onClick={() => onEdit(slide)}
            title="Edit slide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            className={`icon-btn icon-btn--danger ${confirmDelete ? 'icon-btn--confirm' : ''}`}
            onClick={handleDelete}
            title={confirmDelete ? 'Click again to confirm delete' : 'Delete slide'}
          >
            {confirmDelete ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className="slide-thumbnail"
        onClick={() => onPreview(slide)}
        title="Click to preview"
      >
        <div className="slide-html-mini">
          <iframe
            title={`Slide ${index + 1} preview`}
            srcDoc={slide.html}
            sandbox="allow-same-origin"
            scrolling="no"
            className="slide-iframe"
          />
        </div>
      </div>
    </div>
  );
};
