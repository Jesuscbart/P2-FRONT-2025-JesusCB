import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { CharacterPageData } from "../types.ts"; // Importamos el tipo para la estructura de datos

// Handler para procesar las peticiones a la API de Star Wars
export const handler: Handlers<CharacterPageData> = { // Usamos CharacterPageData para tipar lo que devuelve el handler
    GET: async (req, ctx: FreshContext<unknown, CharacterPageData>) => {    // Función para manejar las peticiones GET.
        // Obtener el parámetro name de la URL
        const url = new URL(req.url);
        const searchText = url.searchParams.get("name") || ""; // Obtener el nombre del personaje a buscar o dejarlo en blanco si no hay un nombre
        
        // Verificar que se ha proporcionado un nombre para buscar
        if (!searchText) {
            return ctx.render({ 
                character: null, 
                error: "No se ha proporcionado un nombre para buscar" 
            });
        }

        try {
            // Realizar la petición a la API de Star Wars
            const apiUrl = `https://swapi.dev/api/people/?search=${searchText}&format=json`;
            const response = await axios.get(apiUrl);
            
            // Verificar si hay resultados
            if (!response.data.results || response.data.results.length === 0) { 
                return ctx.render({ 
                    character: null, 
                    error: "No se ha encontrado el personaje" 
                });
            }
            
            // Tomar solo el primer resultado
            const character = response.data.results[0];
            return ctx.render({ character }); // Devolvemos los datos según la estructura CharacterPageData
        } catch (error) {
            console.error("Error al buscar personaje:", error);
            return ctx.render({ 
                character: null, 
                error: "Error al buscar el personaje" 
            });
        }
    },
};

// Página que muestra la información del personaje
const Page = (props: PageProps<CharacterPageData>) => { // Recibimos los datos con la estructura CharacterPageData
    const { character, error } = props.data; // Extraemos character y error de los datos recibidos

    // Mostrar mensaje de error si lo hay
    if (error) {
        return (
            <div className="error-container">
                <h1 className="error-message">{error}</h1>
                <a href="/" className="back-button">Volver a la búsqueda</a>
            </div>
        );
    }

    // Mostrar mensaje si no se encontró el personaje
    if (!character) {
        return (
            <div className="error-container">
                <h1 className="error-message">No se ha encontrado el personaje</h1>
                <a href="/" className="back-button">Volver a la búsqueda</a>
            </div>
        );
    }

    return (
        <div className="character-details">
            <h1 className="character-name">{character.name}</h1>
            
            <div className="character-info">
                <div className="info-section">
                    <h2 className="section-title">Información Básica</h2>
                    <div className="info-item">
                        <span className="label">Altura: </span>
                        <span className="value">{character.height} cm</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Peso: </span>
                        <span className="value">{character.mass} kg</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Color de pelo: </span>
                        <span className="value">{character.hair_color}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Color de piel: </span>
                        <span className="value">{character.skin_color}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Color de ojos: </span>
                        <span className="value">{character.eye_color}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Año de nacimiento: </span>
                        <span className="value">{character.birth_year}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Género: </span>
                        <span className="value">{character.gender}</span>
                    </div>
                </div>
                
                <div className="info-section">
                    <h2 className="section-title">Películas</h2>
                    <ul className="resource-list">
                        {character.films.map((film, index) => (
                            <li key={index}>
                                <a href={film} target="_blank" className="resource-link">
                                    {film}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {character.species.length > 0 && (
                    <div className="info-section">
                        <h2 className="section-title">Especies</h2>
                        <ul className="resource-list">
                            {character.species.map((specie, index) => (
                                <li key={index}>
                                    <a href={specie} target="_blank" className="resource-link">
                                        {specie}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {character.vehicles.length > 0 && (
                    <div className="info-section">
                        <h2 className="section-title">Vehículos</h2>
                        <ul className="resource-list">
                            {character.vehicles.map((vehicle, index) => (
                                <li key={index}>
                                    <a href={vehicle} target="_blank" className="resource-link">
                                        {vehicle}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {character.starships.length > 0 && (
                    <div className="info-section">
                        <h2 className="section-title">Naves</h2>
                        <ul className="resource-list">
                            {character.starships.map((starship, index) => (
                                <li key={index}>
                                    <a href={starship} target="_blank" className="resource-link">
                                        {starship}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <a href="/" className="back-button">Volver a la búsqueda</a>
        </div>
    );
};

export default Page; 