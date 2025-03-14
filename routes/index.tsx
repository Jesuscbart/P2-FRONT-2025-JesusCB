import CharacterSearch from "../islands/CharacterSearch.tsx";

// Página principal con buscador de personajes Star Wars
export default function Home() {
  return (
    <div className="container">
      <div className="search-wrapper">
        <h1 className="title">Buscador de Personajes Star Wars</h1>
        <CharacterSearch />
      </div>
    </div>
  );
}