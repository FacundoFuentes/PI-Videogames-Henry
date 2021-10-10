export function GenreFilter(games, type) {
    return games.filter((game) => game.genres.findIndex((genre) => genre.name === type) >= 0)
}

