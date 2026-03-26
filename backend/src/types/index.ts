export type OutputFormat = 'pdf' | 'word' | 'ppt';

export interface GenerateRequest {
  prompt: string;
  format: OutputFormat;
}

export interface GenerateResponse {
  content: string;
  format: OutputFormat;
}

export interface DownloadRequest {
  content: string;
  format: OutputFormat;
}

export interface SlideData {
  title: string;
  subtitle?: string;
  bullets?: string[];
  body?: string;
  layout: 'title' | 'content' | 'section' | 'closing';
}
