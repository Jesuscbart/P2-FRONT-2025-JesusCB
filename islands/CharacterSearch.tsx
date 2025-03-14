import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

// Componente para buscar los personajes
const CharacterSearch: FunctionalComponent = () => {

  const [name, setName] = useState<string>(""); // Variable de estado para almacenar el nombre del personaje a buscar

  // Función para manejar el envío del formulario
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    // Solo redirige si se ha ingresado un nombre válido
    if (name) {
      // Redirigir a la página de personaje con el nombre como parámetro de búsqueda
      globalThis.location.href = `/personaje?name=${encodeURIComponent(name)}`;
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre del personaje" 
          value={name} 
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
          className="search-input"
        />
        <button className="search-button">Buscar</button>
      </form>
    </div>
  );
};

export default CharacterSearch; 