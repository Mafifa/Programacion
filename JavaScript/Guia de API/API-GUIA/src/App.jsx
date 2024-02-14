import response from "./assets/mock/response.json";
import "./index.css";

function App() {
  const HEROS = response.results;
  const HAS_HERO = HEROS?.length > 0;

  return (
    <div className="text-white">
      <header className="flex flex-col items-center max-w-5xl mx-auto">
        <h1 className="m-10 text-4xl font-bold">Buscador de Heroes</h1>
        <form action="">
          <label htmlFor="name" className="m-4">
            Busca un heroe
          </label>
          <input
            placeholder="Batman, Ironman..."
            type="text"
            id="name"
            name="name"
            required
          />
          <button className="bg-blue-500 m-3 p-2 rounded-xl font-bold">
            buscar
          </button>
        </form>
      </header>
      <main>
        {HAS_HERO ? (
          <ul className="max-w-5xl flex flex-wrap mx-auto">
            {HEROS.map((hero) => (
              <li className="flex bg-slate-900 m-4 rounded-md" key={hero.id}>
                <div className="mr-4">
                  <img
                    src={hero.image.url}
                    alt={hero.name}
                    className="max-w-32 rounded-md"
                  />
                </div>
                <div className="p-4">
                  <h3>{hero.name}</h3>
                  <p>{hero.biography["full-name"]}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>NO SE ENCONTRARON HEROES</p>
        )}
      </main>
    </div>
  );
}

export default App;
