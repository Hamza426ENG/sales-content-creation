const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sales-content-creation-production.up.railway.app';

export async function generateContent(prompt: string, format: string) {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, format }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Failed to generate content' }));
    throw new Error(error.error || 'Failed to generate content');
  }
  return res.json();
}

export async function getPreviewHtml(content: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to get preview');
  const data = await res.json();
  return data.html;
}

export async function refineContent(content: string, feedback: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/refine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, feedback }),
  });
  if (!res.ok) throw new Error('Failed to refine content');
  const data = await res.json();
  return data.content;
}

export async function downloadDocument(content: string, format: string) {
  const res = await fetch(`${API_URL}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, format }),
  });
  if (!res.ok) {
    throw new Error('Failed to generate document');
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const ext = format === 'pdf' ? 'pdf' : format === 'ppt' ? 'pptx' : 'docx';
  a.download = `sales-content.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
