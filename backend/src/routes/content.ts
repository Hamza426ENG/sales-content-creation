import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { generateSalesContent } from '../services/claude';
import { generatePdf } from '../services/pdfGenerator';
import { generateWord } from '../services/wordGenerator';
import { generatePpt } from '../services/pptGenerator';

const router = Router();

const generateSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  format: z.enum(['pdf', 'word', 'ppt']),
});

const downloadSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  format: z.enum(['pdf', 'word', 'ppt']),
});

// Generate content from Claude
router.post('/generate', validate(generateSchema), async (req: Request, res: Response) => {
  try {
    const { prompt, format } = req.body;
    const content = await generateSalesContent(prompt);
    res.json({ content, format });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Download document as PDF or Word
router.post('/download', validate(downloadSchema), async (req: Request, res: Response) => {
  try {
    const { content, format } = req.body;

    if (format === 'pdf') {
      const pdfBuffer = await generatePdf(content);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="sales-content.pdf"');
      res.send(pdfBuffer);
    } else if (format === 'ppt') {
      const pptBuffer = await generatePpt(content);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      );
      res.setHeader('Content-Disposition', 'attachment; filename="sales-content.pptx"');
      res.send(pptBuffer);
    } else {
      const wordBuffer = await generateWord(content);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      res.setHeader('Content-Disposition', 'attachment; filename="sales-content.docx"');
      res.send(wordBuffer);
    }
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to generate document' });
  }
});

export default router;
