import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Slide } from '../types';

const SESSION_KEY = 'html_pptx_session_id';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

const API_BASE = process.env.REACT_APP_API_URL || '';

const createClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: `${API_BASE}/api`,
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': getSessionId(),
    },
    timeout: 60000,
  });
  return client;
};

let client = createClient();

// Refresh client (e.g., after session reset)
export function refreshClient() {
  client = createClient();
}

export const api = {
  // Slides
  async getSlides(): Promise<Slide[]> {
    const { data } = await client.get('/slides');
    return data.slides;
  },

  async addSlide(html: string, title?: string): Promise<Slide> {
    const { data } = await client.post('/slides', { html, title });
    return data.slide;
  },

  async updateSlide(id: string, updates: { html?: string; title?: string }): Promise<Slide> {
    const { data } = await client.put(`/slides/${id}`, updates);
    return data.slide;
  },

  async deleteSlide(id: string): Promise<void> {
    await client.delete(`/slides/${id}`);
  },

  async reorderSlides(slideIds: string[]): Promise<Slide[]> {
    const { data } = await client.post('/slides/reorder', { slideIds });
    return data.slides;
  },

  async clearSlides(): Promise<void> {
    await client.delete('/slides');
  },

  // Export
  async exportPPTX(options: {
    slideIds?: string[];
    presentationTitle?: string;
  } = {}): Promise<Blob> {
    const response = await client.post('/export/pptx', options, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Health
  async checkHealth(): Promise<boolean> {
    try {
      await client.get('/health');
      return true;
    } catch {
      return false;
    }
  },
};

export { getSessionId };
