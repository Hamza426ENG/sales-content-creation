export type OutputFormat = 'pdf' | 'word' | 'ppt';

export interface GenerateResponse {
  content: string;
  format: OutputFormat;
}
