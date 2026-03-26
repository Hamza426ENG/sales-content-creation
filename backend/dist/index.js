"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const content_1 = __importDefault(require("./routes/content"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://hamza426eng.github.io',
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];
app.use((0, cors_1.default)({ origin: allowedOrigins }));
app.use(express_1.default.json({ limit: '10mb' }));
app.use('/api', content_1.default);
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map