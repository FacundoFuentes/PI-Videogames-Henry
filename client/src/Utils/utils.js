export function GenreFilter(games, type) {
    return games.filter((game) => game.genres.findIndex((genre) => genre.name === type) >= 0)
}

export function BDorAPIFilter(games, type) {
    return type === 'BD' ? games.filter((game) => game.id.length > 10) :
    games.filter((game) => game.id.toString().length < 10)
}

export function orderAZ(games, bool) {
    return bool ? games.sort((a, b) => {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if(nameA > nameB) return 1
        if(nameA < nameB) return -1
        return 0
    }) : games.sort((a, b) => {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if(nameA > nameB) return -1
        if(nameA < nameB) return 1
        return 0
})}

export function orderRating(games, bool) {
    return bool ? games.sort((a, b) => {
        let ratingA = a.rating, ratingB = b.rating
        if(ratingA > ratingB) return 1
        if(ratingA < ratingB) return -1
        return 0
    }) : games.sort((a, b) => {
        let ratingA = a.rating, ratingB = b.rating
        if(ratingA > ratingB) return -1
        if(ratingA < ratingB) return 1
        return 0
})}