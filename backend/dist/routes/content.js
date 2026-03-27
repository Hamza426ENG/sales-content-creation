"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const validate_1 = require("../middleware/validate");
const claude_1 = require("../services/claude");
const htmlTemplate_1 = require("../utils/htmlTemplate");
const pdfGenerator_1 = require("../services/pdfGenerator");
const wordGenerator_1 = require("../services/wordGenerator");
const pptGenerator_1 = require("../services/pptGenerator");
const router = (0, express_1.Router)();
const generateSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1, 'Prompt is required'),
    format: zod_1.z.enum(['pdf', 'word', 'ppt']),
});
const downloadSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, 'Content is required'),
    format: zod_1.z.enum(['pdf', 'word', 'ppt']),
});
// Generate content from Claude
router.post('/generate', (0, validate_1.validate)(generateSchema), async (req, res) => {
    try {
        const { prompt, format } = req.body;
        const content = await (0, claude_1.generateSalesContent)(prompt);
        res.json({ content, format });
    }
    catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});
// Download document as PDF or Word
router.post('/download', (0, validate_1.validate)(downloadSchema), async (req, res) => {
    try {
        const { content, format } = req.body;
        if (format === 'pdf') {
            const pdfBuffer = await (0, pdfGenerator_1.generatePdf)(content);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="sales-content.pdf"');
            res.send(pdfBuffer);
        }
        else if (format === 'ppt') {
            const pptBuffer = await (0, pptGenerator_1.generatePpt)(content);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
            res.setHeader('Content-Disposition', 'attachment; filename="sales-content.pptx"');
            res.send(pptBuffer);
        }
        else {
            const wordBuffer = await (0, wordGenerator_1.generateWord)(content);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename="sales-content.docx"');
            res.send(wordBuffer);
        }
    }
    catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to generate document' });
    }
});
// Preview branded HTML
const previewSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, 'Content is required'),
});
router.post('/preview', (0, validate_1.validate)(previewSchema), async (req, res) => {
    try {
        const { content } = req.body;
        const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : 'Sales Content';
        res.json({ html: (0, htmlTemplate_1.wrapInHtml)(content, title) });
    }
    catch (error) {
        console.error('Preview error:', error);
        res.status(500).json({ error: 'Failed to generate preview' });
    }
});
// Refine content with feedback
const refineSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, 'Content is required'),
    feedback: zod_1.z.string().min(1, 'Feedback is required'),
});
router.post('/refine', (0, validate_1.validate)(refineSchema), async (req, res) => {
    try {
        const { content, feedback } = req.body;
        const refinedContent = await (0, claude_1.refineSalesContent)(content, feedback);
        res.json({ content: refinedContent });
    }
    catch (error) {
        console.error('Refine error:', error);
        res.status(500).json({ error: 'Failed to refine content' });
    }
});
exports.default = router;
//# sourceMappingURL=content.js.map