interface ContentPreviewProps {
  content: string;
}

export default function ContentPreview({ content }: ContentPreviewProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
      </div>
      <div
        className="p-8 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
