import { useRef } from "react";
import { useHero, heros } from "./hooks/useHero";

function App() {
  const { hero: mappedHero } = useHero();
  const inputRef = useRef();
  const HAS_HEROS = heros?.length > 0;

  const handleSubbmit = () => {
    const value = inputRef.current.value;
    console.log(value);
  };
  function heroRender() {
    return (
      <ul className="max-w-5xl flex flex-wrap mx-auto">
        {mappedHero.map((hero) => (
          <li className="flex bg-slate-900 m-4 rounded-md" key={hero.id}>
            <div className="mr-4">
              <img
                src={hero.image}
                alt={hero.nameHero}
                className="max-w-32 rounded-md"
              />
            </div>
            <div className="p-4">
              <p>{hero.nameHero}</p>
              <p>{hero.realName}</p>
              <p>{hero.work}</p>
              <p>{hero.pubisher}</p>
              <p>{hero.race}</p>
              <p>{hero.gender}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  function noResponse() {
    return <p>No se encontraron heroes</p>;
  }
  return (
    <div className="text-white">
      <header className="flex flex-col items-center max-w-5xl mx-auto">
        <h1 className="m-10 text-4xl font-bold">Buscador de Heroes</h1>
        <form onSubmit={handleSubbmit}>
          <label htmlFor="name" className="m-4">
            Busca un heroe
          </label>
          <input
            placeholder="Batman, Ironman..."
            type="text"
            id="name"
            ref={inputRef}
            name="name"
            className="text-black"
            required
          />
          <button
            type="button"
            onClick={handleClick}
            className="bg-blue-500 m-3 p-2 rounded-xl font-bold"
          >
            screch
          </button>
        </form>
      </header>
      <main>
        <div>{HAS_HEROS ? heroRender() : noResponse()}</div>
      </main>
    </div>
  );
}

export default App;
