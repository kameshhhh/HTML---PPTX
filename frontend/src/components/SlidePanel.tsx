import React, { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Slide } from '../types';
import { SlideCard } from './SlideCard';

interface SlidePanelProps {
  slides: Slide[];
  onEdit: (slide: Slide) => void;
  onDelete: (id: string) => void;
  onPreview: (slide: Slide) => void;
  onReorder: (slideIds: string[]) => void;
  onExport: () => void;
  onClear: () => void;
  exporting: boolean;
  loading: boolean;
}

export const SlidePanel: React.FC<SlidePanelProps> = ({
  slides,
  onEdit,
  onDelete,
  onPreview,
  onReorder,
  onExport,
  onClear,
  exporting,
  loading,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex(s => s.id === active.id);
    const newIndex = slides.findIndex(s => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(slides, oldIndex, newIndex);
    onReorder(reordered.map(s => s.id));
  }, [slides, onReorder]);

  return (
    <div className="slide-panel">
      <div className="slide-panel-header">
        <div className="slide-panel-title">
          <h2>Slides</h2>
          <span className="slide-count">{slides.length}</span>
        </div>
        {slides.length > 0 && (
          <button
            className="btn btn-ghost btn-sm btn-danger"
            onClick={onClear}
            disabled={loading}
            title="Remove all slides"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            </svg>
            Clear All
          </button>
        )}
      </div>

      <div className="slides-list">
        {slides.length === 0 ? (
          <div className="slides-empty">
            <div className="empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <p className="empty-title">No slides yet</p>
            <p className="empty-desc">Paste HTML in the editor and click "Convert to Slide"</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={slides.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {slides.map((slide, idx) => (
                <SlideCard
                  key={slide.id}
                  slide={slide}
                  index={idx}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPreview={onPreview}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="export-section">
        <button
          className="btn btn-export"
          onClick={onExport}
          disabled={slides.length === 0 || exporting}
        >
          {exporting ? (
            <>
              <span className="spinner spinner--white" />
              Generating PPTX...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export as PPTX
            </>
          )}
        </button>
        {slides.length > 0 && (
          <p className="export-hint">{slides.length} slide{slides.length !== 1 ? 's' : ''} · drag to reorder</p>
        )}
      </div>
    </div>
  );
};
