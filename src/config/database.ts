import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';

const candidates = [
    process.env.DB_PATH,
    path.resolve(process.cwd(), 'identifier.sqlite'),
    path.resolve(process.cwd(), '.idea', 'dataSources', 'identifier.sqlite'),
].filter(Boolean) as string[];

const dbPath = candidates.find(p => fs.existsSync(p));
if (!dbPath) {
    throw new Error(`Nie znaleziono pliku bazy danych. Ustaw DB_PATH lub umieść identifier.sqlite w katalogu projektu.`);
}

const db = new Database(dbPath, { verbose: console.log });
export default db;