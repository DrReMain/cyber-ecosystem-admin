import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import express from 'express';

import { handlers } from '@/services/msw/handlers';

const app = express();
app.use(cors());
app.use(express.json());
app.use(createMiddleware(...handlers));

const PORT = Number.parseInt(process.env.PORT || '', 10) || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Mock server ready at http://0.0.0.0:${PORT}`));
