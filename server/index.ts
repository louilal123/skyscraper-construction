import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';
import testRouter from './routes/testroute';

const app = express();
// const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0'; // Critical for Render!

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://skyscraper-construction.vercel.app'
        : 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/test', testRouter);
app.use('/api/chat', chatRouter);

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});