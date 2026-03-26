import { OutputFormat } from '@/types';

interface FormatSelectorProps {
  format: OutputFormat;
  onChange: (format: OutputFormat) => void;
}

export default function FormatSelector({ format, onChange }: FormatSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange('pdf')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          format === 'pdf'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        PDF
      </button>
      <button
        type="button"
        onClick={() => onChange('word')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          format === 'word'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        Word
      </button>
      <button
        type="button"
        onClick={() => onChange('ppt')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          format === 'ppt'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        PowerPoint
      </button>
    </div>
  );
}
