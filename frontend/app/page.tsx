'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PromptForm from '@/components/PromptForm';
import ContentPreview from '@/components/ContentPreview';
import DownloadButton from '@/components/DownloadButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateContent } from '@/lib/api';
import { OutputFormat } from '@/types';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState<OutputFormat>('pdf');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setContent('');
    try {
      const response = await generateContent(prompt, format);
      setContent(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {content && !isLoading && (
            <>
              <ContentPreview content={content} />
              <div className="flex justify-end">
                <DownloadButton content={content} format={format} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
