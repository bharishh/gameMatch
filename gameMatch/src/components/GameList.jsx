import {useState, useEffect, useMemo} from "react";

export default function GameList() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [platform, setPlatform] = useState("");
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    const genres = useMemo(() => {
        return [...new Set(games.map(game => game.genre))];
    }, [games]);


    const platforms = useMemo(() => {
        return [...new Set(games.map(game => game.platform))];
    }, [games]);

    const filteredGames = games
        .filter(game =>
            game.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(game =>
            genre ? game.genre === genre : true
        )
        .filter(game =>
            platform ? game.platform === platform : true
        )
        .slice(0, 10)

    return (
        <div>
            <input
                type="search"
                placeholder="Rechercher par nom"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <select value={genre} onChange={e => setGenre(e.target.value)}>
                <option value="">Tous les genres</option>
                {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>

            <select value={platform} onChange={e => setPlatform(e.target.value)}>
                <option value="">Toutes les plateformes</option>
                {platforms.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>


            {filteredGames.map(game => (
                <div key={game.id}>
                    <h3>{game.title}</h3>
                    <img src={game.thumbnail} alt={game.title} />
                    <p>{game.genre}</p>
                    <p>{game.platform}</p>
                </div>
            ))}
        </div>
    );
}
