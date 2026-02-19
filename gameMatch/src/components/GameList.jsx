import { useState, useEffect } from "react";

export default function GameList() {

    const [games, setGames] = useState([]);
    const[search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    return (
        <div>
            <input type="search" placeholder="rechercher par nom" value={search} onChange={e => setSearch(e.target.value)} />
            <button>Rechercher</button>
            {games.slice(0,10).map(game => (
                <div key={game.id}>
                    <h3>{game.title}</h3>
                    <img src={game.thumbnail} alt={game.title} />
                    <p>{game.genre}</p>
                </div>
            ))}
        </div>
    );
}