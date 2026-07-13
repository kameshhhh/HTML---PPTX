export interface Slide {
  id: string;
  html: string;
  title: string;
  thumbnail?: string;
  order: number;
  createdAt: string;
}

export type AppView = 'editor' | 'preview';

export interface ApiError {
  error: string;
  message?: string;
}
