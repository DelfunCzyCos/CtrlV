// src/lib/favoritesCookie.ts
// Favorites store: przechowuje array obiektów { id, title?, year?, genre? } w localStorage
// API:
// - getFavoritesItems(): FavoriteItem[]
// - getFavoritesIds(): string[]
// - isFavorite(id)
// - addFavoriteItem(item)
// - removeFavorite(id)
// - toggleFavorite(idOrItem)

const STORAGE_KEY = "stream_favorites_v1";
export const favoritesEvents = new EventTarget();

export type FavoriteItem = {
    id: string;
    title?: string;
    year?: string | number;
    genre?: string;
};

function readLSRaw(): string | null {
    try {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function writeLSRaw(value: string) {
    try {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
        console.warn("favoritesStore: writeLSRaw error", err);
    }
}

function parseStoredRawToItems(raw: string | null): FavoriteItem[] {
    try {
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        // normalize id and keep metadata, dedupe by id (last write wins)
        const map = new Map<string, FavoriteItem>();
        parsed.forEach((it: any) => {
            if (!it) return;
            const id = String(it.id ?? it).trim();
            if (!id) return;
            const item: FavoriteItem = {
                id,
                title: it.title ? String(it.title) : undefined,
                year: it.year ?? undefined,
                genre: it.genre ?? undefined,
            };
            map.set(id, item);
        });
        return Array.from(map.values());
    } catch {
        return [];
    }
}

function emitChange(items: FavoriteItem[]) {
    favoritesEvents.dispatchEvent(new CustomEvent("favorites:change", { detail: items }));
}

export function getFavoritesItems(): FavoriteItem[] {
    const raw = readLSRaw();
    return parseStoredRawToItems(raw);
}

export function getFavoritesIds(): string[] {
    return getFavoritesItems().map((i) => i.id);
}

export function isFavorite(id: string | number): boolean {
    const s = String(id).trim();
    return getFavoritesIds().includes(s);
}

export function setFavoritesItems(items: FavoriteItem[]) {
    // normalize + dedupe by id (last wins)
    const map = new Map<string, FavoriteItem>();
    items.forEach((it) => {
        const id = String(it.id).trim();
        if (!id) return;
        map.set(id, { id, title: it.title, year: it.year, genre: it.genre });
    });
    const normalized = Array.from(map.values());
    writeLSRaw(JSON.stringify(normalized));
    emitChange(normalized);
}

export function addFavoriteItem(item: FavoriteItem) {
    const id = String(item.id).trim();
    if (!id) return;
    const items = getFavoritesItems();
    const exists = items.find((i) => i.id === id);
    if (exists) {
        // update metadata if provided
        const next = items.map((i) => (i.id === id ? { ...i, ...item } : i));
        setFavoritesItems(next);
    } else {
        setFavoritesItems([...items, { id, title: item.title, year: item.year, genre: item.genre }]);
    }
    console.log("favoritesStore: addFavoriteItem ->", getFavoritesIds());
}

export function removeFavorite(id: string | number) {
    const s = String(id).trim();
    if (!s) return;
    const items = getFavoritesItems();
    const next = items.filter((i) => i.id !== s);
    setFavoritesItems(next);
    console.log("favoritesStore: removeFavorite ->", getFavoritesIds());
}

export function toggleFavorite(idOrItem: string | number | FavoriteItem) {
    const id = typeof idOrItem === "object" ? String(idOrItem.id) : String(idOrItem);
    const s = id.trim();
    if (!s) return;
    if (isFavorite(s)) {
        removeFavorite(s);
    } else {
        if (typeof idOrItem === "object") {
            addFavoriteItem({ id: s, title: idOrItem.title, year: idOrItem.year, genre: idOrItem.genre });
        } else {
            // no metadata — add id only
            addFavoriteItem({ id: s });
        }
    }
}

export function clearFavorites() {
    setFavoritesItems([]);
}

// subscribe: callback receives FavoriteItem[] (normalized, deduped)
export function subscribeFavorites(callback: (items: FavoriteItem[]) => void) {
    const handler = (e: Event) => {
        const ce = e as CustomEvent<FavoriteItem[]>;
        callback(ce.detail ?? getFavoritesItems());
    };
    favoritesEvents.addEventListener("favorites:change", handler as EventListener);
    // immediate call
    callback(getFavoritesItems());
    return () => favoritesEvents.removeEventListener("favorites:change", handler as EventListener);
}

// debug helper
export function debugDump() {
    return {
        localStorage: readLSRaw(),
        parsed: getFavoritesItems(),
    };
}

// expose minimal helpers for console convenience (optional)
if (typeof window !== "undefined") {
    (window as any).__fav = {
        ...(window as any).__fav,
        debugDump,
        getFavoritesItems,
        toggleFavorite,
        addFavoriteItem,
        removeFavorite,
    };
}