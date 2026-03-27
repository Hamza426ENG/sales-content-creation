'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import ContentPreview from '@/components/ContentPreview';
import DownloadButton from '@/components/DownloadButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateContent, getPreviewHtml, refineContent } from '@/lib/api';
import { OutputFormat } from '@/types';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState<OutputFormat>('pdf');
  const [content, setContent] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setContent('');
    setPreviewHtml('');
    setFeedback('');
    try {
      const response = await generateContent(prompt, format);
      setContent(response.content);
      const html = await getPreviewHtml(response.content);
      setPreviewHtml(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!feedback.trim()) return;
    setIsRefining(true);
    setError('');
    try {
      const refined = await refineContent(content, feedback);
      setContent(refined);
      const html = await getPreviewHtml(refined);
      setPreviewHtml(html);
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine content');
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <PromptForm
            prompt={prompt}
            format={format}
            isLoading={isLoading}
            onPromptChange={setPrompt}
            onFormatChange={setFormat}
            onSubmit={handleGenerate}
          />

          {isLoading && <LoadingSpinner />}

          {previewHtml && !isLoading && (
            <>
              <ContentPreview html={previewHtml} />
              <div className="flex justify-end">
                <DownloadButton content={content} format={format} />
              </div>
            </>
          )}

          {content && !isLoading && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Refine Content</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe how you'd like to improve the content..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
                disabled={isRefining}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleRefine}
                  disabled={isRefining || !feedback.trim()}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isRefining ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Refining...
                    </>
                  ) : (
                    'Refine'
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
