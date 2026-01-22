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
    director: string;
    year: number;
    duration: string;
    platforms: Platform[];
    trailerUrl: string;
    views: number;
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
        description: "Mroczny thriller o detektywie ścigającym seryjnego mordercę. W mieście, gdzie deszcz nigdy nie przestaje padać, detektyw John Doe musi zmierzyć się z własnymi demonami, aby schwytać nieuchwytnego zabójcę, który zostawia za sobą jedynie zagadkowe symbole.",
        imageUrl: "https://images.unsplash.com/photo-1642979904720-a552640c2319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGhvcnJvcnxlbnwxfHx8fDE3NjU0NjkyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Horror",
        director: "David Fincher",
        year: 2023,
        duration: "1h 45m",
        platforms: [PLATFORMS[0], PLATFORMS[3]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        views: 1250000
    },
    {
        id: "2",
        title: "Szybka Akcja",
        description: "Były komandos musi uratować córkę z rąk porywaczy. Wyścig z czasem, wybuchy i niesamowite pościgi samochodowe w sercu europejskiej stolicy.",
        imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbnxlbnwxfHx8fDE3NjU1MjE1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Akcja",
        director: "Michael Bay",
        year: 2024,
        duration: "1h 55m",
        platforms: [PLATFORMS[0], PLATFORMS[1]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        views: 890000
    },
    {
        id: "3",
        title: "Dramat Rodzinny",
        description: "Poruszająca historia o relacjach i przebaczeniu. Dwa pokolenia, jeden dom i tajemnica, która może zniszczyć lub ocalić ich więzi.",
        imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGRyYW1hfGVufDF8fHx8MTc2NTQ2OTI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Dramat",
        director: "Greta Gerwig",
        year: 2022,
        duration: "2h 05m",
        platforms: [PLATFORMS[2]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        views: 450000
    },
    {
        id: "4",
        title: "Kosmiczna Pustka",
        description: "Samotność w kosmosie ma wiele obliczy. Astronautka utknęła na stacji badawczej orbitującej wokół Jowisza, a systemy podtrzymywania życia zaczynają szwankować.",
        imageUrl: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maXxlbnwxfHx8fDE3NjU1NDA4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Sci-Fi",
        director: "Alfonso Cuarón",
        year: 2023,
        duration: "1h 30m",
        platforms: [PLATFORMS[4], PLATFORMS[1]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        views: 2100000
    },
    {
        id: "5",
        title: "Cyber Miasto",
        description: "W świecie rządzonym przez korporacje, jeden haker stawia opór. Neonowe światła, latające samochody i walka o wolność w cyfrowym świecie.",
        imageUrl: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maXxlbnwxfHx8fDE3NjU1NDA4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Sci-Fi",
        director: "Ridley Scott",
        year: 2025,
        duration: "2h 10m",
        platforms: [PLATFORMS[0], PLATFORMS[2], PLATFORMS[4]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        views: 3200000
    },
    {
        id: "6",
        title: "Ostatni Bastion",
        description: "Grupa ocalałych walczy o przetrwanie w postapokaliptycznym świecie. Zasoby się kończą, a zagrożenie czai się za każdym rogiem.",
        imageUrl: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbnxlbnwxfHx8fDE3NjU1MjE1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Akcja",
        director: "George Miller",
        year: 2024,
        duration: "2h 00m",
        platforms: [PLATFORMS[0]],
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        views: 750000
    }
];

export const categories = ["Polecane", "Akcja", "Sci-Fi", "Dramat", "Horror"];
