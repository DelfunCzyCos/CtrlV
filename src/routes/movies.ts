import express, { Request, Response } from 'express';
import { fetchMovies, fetchMovieById } from '../services/movieService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    try {
        const movies = fetchMovies();
        res.status(200).json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Nie udało się pobrać listy filmów' });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    try {
        const movie = fetchMovieById(Number(req.params.id));
        if (!movie) return res.status(404).json({ error: 'Film nie znaleziony' });
        res.status(200).json(movie);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Nie udało się pobrać szczegółów filmu' });
    }
});

export default router;