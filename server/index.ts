import dotenv from 'dotenv';
import path from 'path';

// Load .env from the same directory as this file
dotenv.config({ path: path.resolve(__dirname, '.env') });


import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';
import testRouter from './routes/testroute';
const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0'; // Required for Render

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://skyscraper-construction.vercel.app'
        : 'http://localhost:5173',
}));
app.use(express.json());
app.use('/api/test', testRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
