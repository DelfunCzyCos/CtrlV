import db from '../config/database';

// Definiujemy typy danych dla filmu
export interface Movie {
    id: number;
    title: string;
    category: string;
    year: number;
    description: string;
    director: string;
    duration: string;
}

// Funkcja do pobierania listy filmów
export const fetchMovies = (): Movie[] => {
    const statement = db.prepare(
        /* language=SQL dialect=SQLite */
        `
        SELECT 
            c.id, 
            c.title, 
            cat.name AS category, 
            c.year, 
            c.description, 
            d.name AS director, 
            c.duration 
        FROM content c
        LEFT JOIN content_categories cc ON c.id = cc.content_id
        LEFT JOIN categories cat ON cat.id = cc.category_id
        LEFT JOIN directors d ON d.id = c.director_id
    `);
    return statement.all() as Movie[];
};

// Funkcja do pobierania informacji o jednym filmie
export const fetchMovieById = (id: number): Movie | undefined => {
    const statement = db.prepare(`
        SELECT 
            c.id, 
            c.title, 
            cat.name AS category, 
            c.year, 
            c.description, 
            d.name AS director, 
            c.duration 
        FROM content c 
        LEFT JOIN content_categories cc ON c.id = cc.content_id
        LEFT JOIN categories cat ON cat.id = cc.category_id
        LEFT JOIN directors d ON d.id = c.director_id
        WHERE c.id = ?
    `);
    return statement.get(id) as Movie;
};