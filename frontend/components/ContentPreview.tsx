interface ContentPreviewProps {
  html: string;
}

export default function ContentPreview({ html }: ContentPreviewProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
      </div>
      <div className="p-8 flex justify-center bg-slate-100">
        <div
          className="relative bg-white shadow-lg"
          style={{
            width: '210mm',
            maxWidth: '100%',
            aspectRatio: '210 / 297',
            overflow: 'hidden',
          }}
        >
          <iframe
            srcDoc={html}
            title="Content Preview"
            className="w-full h-full border-0"
            style={{
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              width: '133.33%',
              height: '133.33%',
            }}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
