// Tipo para los datos del personaje de Star Wars
export type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
};

// Tipo para la respuesta de la página de personaje
// Define la estructura de datos que se usa para comunicar entre el handler y el componente de página
export type CharacterPageData = {
    character: Character | null; // El personaje encontrado o null si no se encontró
    error?: string; // Mensaje de error opcional que puede aparecer
}; 