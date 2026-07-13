import { useState, useCallback, useEffect } from 'react';
import { Slide } from '../types';
import { api } from '../utils/api';

interface UseSlidesReturn {
  slides: Slide[];
  loading: boolean;
  error: string | null;
  addSlide: (html: string, title?: string) => Promise<Slide | null>;
  updateSlide: (id: string, updates: { html?: string; title?: string }) => Promise<Slide | null>;
  deleteSlide: (id: string) => Promise<boolean>;
  reorderSlides: (slideIds: string[]) => Promise<void>;
  clearSlides: () => Promise<void>;
  refreshSlides: () => Promise<void>;
  clearError: () => void;
}

export function useSlides(): UseSlidesReturn {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSlides = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getSlides();
      setSlides(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load slides';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSlides();
  }, [refreshSlides]);

  const addSlide = useCallback(async (html: string, title?: string): Promise<Slide | null> => {
    try {
      setLoading(true);
      setError(null);
      const slide = await api.addSlide(html, title);
      setSlides(prev => [...prev, slide]);
      return slide;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add slide';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSlide = useCallback(async (
    id: string,
    updates: { html?: string; title?: string }
  ): Promise<Slide | null> => {
    try {
      setLoading(true);
      setError(null);
      const updated = await api.updateSlide(id, updates);
      setSlides(prev => prev.map(s => s.id === id ? updated : s));
      return updated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update slide';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSlide = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteSlide(id);
      setSlides(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete slide';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reorderSlides = useCallback(async (slideIds: string[]): Promise<void> => {
    // Optimistic update
    const ordered = slideIds
      .map(id => slides.find(s => s.id === id))
      .filter(Boolean) as Slide[];
    setSlides(ordered);

    try {
      await api.reorderSlides(slideIds);
    } catch (err) {
      // Revert on failure
      await refreshSlides();
      const msg = err instanceof Error ? err.message : 'Failed to reorder slides';
      setError(msg);
    }
  }, [slides, refreshSlides]);

  const clearSlides = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await api.clearSlides();
      setSlides([]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to clear slides';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    slides,
    loading,
    error,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    clearSlides,
    refreshSlides,
    clearError,
  };
}
