
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  genre: string;
  match: number; // percentage match
  year: number;
  duration: string;
}

export const FEATURED_MOVIE: Movie = {
  id: "featured-1",
  title: "Cyber Horyzont",
  description: "W niedalekiej przyszłości, elitarna jednostka hakerów odkrywa spisek, który zagraża istnieniu ludzkości. Czy zdążą powstrzymać katastrofę przed upływem czasu?",
  thumbnailUrl: "https://images.unsplash.com/photo-1762417419967-d5ccd2ebe463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBtb3ZpZSUyMHNjZW5lJTIwYWN0aW9ufGVufDF8fHx8MTc2NTUzMzI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  genre: "Sci-Fi / Akcja",
  match: 98,
  year: 2024,
  duration: "2h 15m"
};

export const TRENDING_MOVIES: Movie[] = [
  {
    id: "t-1",
    title: "Głębia Kosmosu",
    description: "Samotna podróż przez galaktykę zmienia się w walkę o przetrwanie.",
    thumbnailUrl: "https://images.unsplash.com/photo-1653045474061-075ba29db54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMGxhbmRzY2FwZSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY1NTQwNzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Sci-Fi",
    match: 95,
    year: 2023,
    duration: "1h 50m"
  },
  {
    id: "t-2",
    title: "Cienie Nocy",
    description: "Detektyw z problemami musi rozwiązać sprawę seryjnego mordercy.",
    thumbnailUrl: "https://images.unsplash.com/photo-1566331312619-5642b93028e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMG1vdmllJTIwcG9zdGVyJTIwZGFya3xlbnwxfHx8fDE3NjU1NDA3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Kryminał",
    match: 88,
    year: 2022,
    duration: "2h 05m"
  },
  {
    id: "t-3",
    title: "Dzika Natura",
    description: "Niesamowita podróż przez nieodkryte zakątki naszej planety.",
    thumbnailUrl: "https://images.unsplash.com/photo-1694069658179-4f058d5571aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMG5hdHVyZSUyMHdpbGRsaWZlJTIwaGlnaCUyMHF1YWxpdHl8ZW58MXx8fHwxNzY1NTQwNzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Dokument",
    match: 92,
    year: 2024,
    duration: "1h 30m"
  },
  {
    id: "t-4",
    title: "Neon City",
    description: "Animowana opowieść o miłości w cyberpunkowym świecie.",
    thumbnailUrl: "https://images.unsplash.com/photo-1764520408437-95890a95db4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMHN0eWxlJTIwYXJ0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzY1NTQwNzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genre: "Anime",
    match: 99,
    year: 2023,
    duration: "24m"
  }
];

export const NEW_RELEASES = [...TRENDING_MOVIES].reverse();
