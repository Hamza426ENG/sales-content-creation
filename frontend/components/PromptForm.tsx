'use client';

import { OutputFormat } from '@/types';
import FormatSelector from './FormatSelector';

interface PromptFormProps {
  prompt: string;
  format: OutputFormat;
  isLoading: boolean;
  onPromptChange: (value: string) => void;
  onFormatChange: (format: OutputFormat) => void;
  onSubmit: () => void;
}

export default function PromptForm({
  prompt,
  format,
  isLoading,
  onPromptChange,
  onFormatChange,
  onSubmit,
}: PromptFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-semibold text-slate-700 mb-2">
          Describe the sales content you need
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g., Create a one-page sales proposal for our cloud migration services targeting mid-size healthcare companies..."
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical text-sm text-slate-800 placeholder:text-slate-400"
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Output format:</span>
          <FormatSelector format={format} onChange={onFormatChange} />
        </div>
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>
    </form>
  );
}
