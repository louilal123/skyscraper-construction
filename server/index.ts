import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';
import testRouter from './routes/testroute';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/test', testRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});