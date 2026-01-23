import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies';

const app = express();
app.use(cors());
app.use(express.json());

// API do filmów
app.use('/api/movies', moviesRouter);

// Healthcheck
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API działa na http://localhost:${port}`);
});