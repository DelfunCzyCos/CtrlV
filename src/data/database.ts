import Database from 'better-sqlite3';
import path from 'path';

// Ścieżka do pliku bazy danych
const dbPath = path.join(__dirname, '../../identifier.sqlite');

// Utworzenie połączenia z bazą danych
const db = new Database(dbPath, { verbose: console.log });

export default db;