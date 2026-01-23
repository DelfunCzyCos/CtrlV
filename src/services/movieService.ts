import db from '../config/database';

export interface Movie {
    id: number;
    title: string;
    categories: string[];      // lista kategorii
    year: number | null;
    description: string | null;
    director: string | null;
    duration: string | null;
    platforms?: string[];      // opcjonalnie platformy
    actors?: string[];         // opcjonalnie aktorzy
}

/**
 * Mapuje wynik SQLite (GROUP_CONCAT) do tablic stringów.
 */
function splitAgg(value: unknown): string[] {
    if (!value || typeof value !== 'string') return [];
    return value.split(',').map(s => s.trim()).filter(Boolean);
}

/**
 * Pobierz listę filmów z opcjonalnymi agregacjami.
 */
export const fetchMovies = (): Movie[] => {
    const stmt = db.prepare(
        /* language=SQL dialect=SQLite */
        `
    SELECT
      c.id,
      c.title,
      c.year,
      c.description,
      c.duration,
      d.name AS director,
      COALESCE(GROUP_CONCAT(DISTINCT cat.name), '') AS agg_categories,
      COALESCE(GROUP_CONCAT(DISTINCT p.name), '') AS agg_platforms,
      COALESCE(GROUP_CONCAT(DISTINCT a.full_name), '') AS agg_actors
    FROM content c
    LEFT JOIN directors d            ON d.id = c.director_id
    LEFT JOIN content_categories cc  ON cc.content_id = c.id
    LEFT JOIN categories cat         ON cat.id = cc.category_id
    LEFT JOIN content_platforms cp   ON cp.content_id = c.id
    LEFT JOIN platforms p            ON p.id = cp.platform_id
    LEFT JOIN content_actors ca      ON ca.content_id = c.id
    LEFT JOIN actors a               ON a.id = ca.actor_id
    GROUP BY c.id
    ORDER BY c.id ASC
    `
    );

    const rows = stmt.all() as any[];
    return rows.map(r => ({
        id: r.id,
        title: r.title,
        year: r.year ?? null,
        description: r.description ?? null,
        duration: r.duration ?? null,
        director: r.director ?? null,
        categories: splitAgg(r.agg_categories),
        platforms: splitAgg(r.agg_platforms),
        actors: splitAgg(r.agg_actors),
    }));
};

/**
 * Pobierz pojedynczy film po ID.
 */
export const fetchMovieById = (id: number): Movie | undefined => {
    const stmt = db.prepare(
        /* language=SQL dialect=SQLite */
        `
    SELECT
      c.id,
      c.title,
      c.year,
      c.description,
      c.duration,
      d.name AS director,
      COALESCE(GROUP_CONCAT(DISTINCT cat.name), '') AS agg_categories,
      COALESCE(GROUP_CONCAT(DISTINCT p.name), '') AS agg_platforms,
      COALESCE(GROUP_CONCAT(DISTINCT a.full_name), '') AS agg_actors
    FROM content c
    LEFT JOIN directors d            ON d.id = c.director_id
    LEFT JOIN content_categories cc  ON cc.content_id = c.id
    LEFT JOIN categories cat         ON cat.id = cc.category_id
    LEFT JOIN content_platforms cp   ON cp.content_id = c.id
    LEFT JOIN platforms p            ON p.id = cp.platform_id
    LEFT JOIN content_actors ca      ON ca.content_id = c.id
    LEFT JOIN actors a               ON a.id = ca.actor_id
    WHERE c.id = ?
    GROUP BY c.id
    `
    );

    const r = stmt.get(id) as any;
    if (!r) return undefined;

    return {
        id: r.id,
        title: r.title,
        year: r.year ?? null,
        description: r.description ?? null,
        duration: r.duration ?? null,
        director: r.director ?? null,
        categories: splitAgg(r.agg_categories),
        platforms: splitAgg(r.agg_platforms),
        actors: splitAgg(r.agg_actors),
    };
};