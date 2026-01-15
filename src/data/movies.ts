export interface Platform {
  name: string;
  color: string;
  url: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  year: number;
  duration: string;
  platforms: Platform[];
  trailerUrl: string;
  views: number;
  director: string;
}

export const PLATFORMS: Platform[] = [
  { name: "Netflix", color: "bg-red-600", url: "#" },
  { name: "HBO Max", color: "bg-purple-600", url: "#" },
  { name: "Disney+", color: "bg-blue-600", url: "#" },
  { name: "Prime Video", color: "bg-blue-400", url: "#" },
  { name: "Apple TV+", color: "bg-gray-800", url: "#" }
];

export const movies: Movie[] = [
  {
    id: "1",
    title: "Nocny Łowca",
    description: "Mroczny thriller o detektywie ścigającym seryjnego mordercę. W mieście, gdzie deszcz nigdy nie przestaje padać, detektyw John Doe musi zmierzyć się z własnymi demonami, aby s[...]",
    imageUrl: "https://images.unsplash.com/photo-1642979904720-a552640c2319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGhvcnJvcnxlbnwxfHx8fDE3NjU[...]",
    category: "Horror",
    year: 2023,
    duration: "1h 45m",
    platforms: [PLATFORMS[0], PLATFORMS[3]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 1250000,
    director: "Michał Nowak"
  },
  {
    id: "2",
    title: "Szybka Akcja",
    description: "Były komandos musi uratować córkę z rąk porywaczy. Wyścig z czasem, wybuchy i niesamowite pościgi samochodowe w sercu europejskiej stolicy.",
    imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMHBhY3Rpb24lMjBhY3Rpb25lbnwxfHx8fDE3NjU[...]",
    category: "Akcja",
    year: 2024,
    duration: "1h 55m",
    platforms: [PLATFORMS[0], PLATFORMS[1]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 890000,
    director: "Anna Zielińska"
  },
  {
    id: "3",
    title: "Dramat Rodzinny",
    description: "Poruszająca historia o relacjach i przebaczeniu. Dwa pokolenia, jeden dom i tajemnica, która może zniszczyć lub ocalić ich więzi.",
    imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGRyYW1hfGVufDF8fHx8MTc2NTQ[...]",
    category: "Dramat",
    year: 2022,
    duration: "2h 05m",
    platforms: [PLATFORMS[2]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 450000,
    director: "Piotr Kowalczyk"
  },
  {
    id: "4",
    title: "Kosmiczna Pustka",
    description: "Samotność w kosmosie ma wiele obliczy. Astronautka utkn��ła na stacji badawczej orbitującej wokół Jowisza, a systemy podtrzymywania życia zaczynają szwankować.",
    imageUrl: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maXxlbnwxfHx8fDE3NjU[...]",
    category: "Sci-Fi",
    year: 2023,
    duration: "1h 30m",
    platforms: [PLATFORMS[4], PLATFORMS[1]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 2100000,
    director: "Katarzyna Wójcik"
  },
  {
    id: "5",
    title: "Cyber Miasto",
    description: "W świecie rządzonym przez korporacje, jeden haker stawia opór. Neonowe światła, latające samochody i walka o wolność w cyfrowym świecie.",
    imageUrl: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maXxlbnwxfHx8fDE3NjU[...]",
    category: "Sci-Fi",
    year: 2025,
    duration: "2h 10m",
    platforms: [PLATFORMS[0], PLATFORMS[2], PLATFORMS[4]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 3200000,
    director: "Michał Nowak"
  },
  {
    id: "6",
    title: "Ostatni Bastion",
    description: "Grupa ocalałych walczy o przetrwanie w postapokaliptycznym świecie. Zasoby się kończą, a zagrożenie czai się za każdym rogiem.",
    imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbnxlbnwxfHx8fDE3NjU[...]",
    category: "Akcja",
    year: 2024,
    duration: "2h 00m",
    platforms: [PLATFORMS[0]],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: 750000,
    director: "Anna Zielińska"
  }
];

export const categories = ["Polecane", "Akcja", "Sci-Fi", "Dramat", "Horror"];