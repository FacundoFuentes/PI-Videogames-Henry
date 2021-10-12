// let arr = [{"id":"17b05bb8-d884-437d-a382-87fa6d8af248","name":"Carlos Juarez","image":"https://static.wikia.nocookie.net/callofjuarez/images/5/53/Call_of_Juarez.jpg","rating":4,"platforms":[{"name":"PS3"},{"name":"PC"}],"genres":[{"id":1,"name":"Action"},{"id":2,"name":"Indie"},{"id":3,"name":"Adventure"},{"id":4,"name":"RPG"},{"id":5,"name":"Strategy"},{"id":6,"name":"Shooter"},{"id":7,"name":"Casual"},{"id":8,"name":"Simulation"},{"id":9,"name":"Puzzle"}]},{"id":"6445196c-9db5-4990-bf60-825e041dfafa","name":"asdasd","image":"asdasda","rating":3,"platforms":[{"name":"Android"},{"name":"Xbox"}],"genres":[{"id":15,"name":"Fighting"},{"id":9,"name":"Puzzle"}]},{"id":3498,"name":"Grand Theft Auto V","image":"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg","rating":4.48,"genres":[{"id":4,"name":"Action"},{"id":3,"name":"Adventure"}],"platforms":[{"name":"PlayStation 5"},{"name":"PlayStation 4"},{"name":"PlayStation 3"},{"name":"Xbox 360"},{"name":"PC"},{"name":"Xbox One"},{"name":"Xbox Series S/X"}]},{"id":3328,"name":"The Witcher 3: Wild Hunt","image":"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg","rating":4.67,"genres":[{"id":4,"name":"Action"},{"id":3,"name":"Adventure"},{"id":5,"name":"RPG"}],"platforms":[{"name":"Nintendo Switch"},{"name":"Xbox One"},{"name":"PC"},{"name":"PlayStation 4"}]},{"id":4200,"name":"Portal 2","image":"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg","rating":4.62,"genres":[{"id":2,"name":"Shooter"},{"id":7,"name":"Puzzle"}],"platforms":[{"name":"Xbox 360"},{"name":"macOS"},{"name":"Linux"},{"name":"PC"},{"name":"PlayStation 3"},{"name":"Xbox One"}]},{"id":5286,"name":"Tomb Raider (2013)","image":"https://media.rawg.io/media/games/ad2/ad2ffdf80ba993654f31da045bc02456.jpg","rating":4.06,"genres":[{"id":4,"name":"Action"},{"id":3,"name":"Adventure"}],"platforms":[{"name":"macOS"},{"name":"Xbox One"},{"name":"PlayStation 4"},{"name":"PC"},{"name":"Xbox 360"},{"name":"PlayStation 3"}]},{"id":5679,"name":"The Elder Scrolls V: Skyrim","image":"https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg","rating":4.43,"genres":[{"id":4,"name":"Action"},{"id":5,"name":"RPG"}],"platforms":[{"name":"PC"},{"name":"Nintendo Switch"},{"name":"Xbox 360"},{"name":"PlayStation 3"}]},{"id":12020,"name":"Left 4 Dead 2","image":"https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg","rating":4.08,"genres":[{"id":4,"name":"Action"},{"id":2,"name":"Shooter"}],"platforms":[{"name":"PC"},{"name":"Xbox 360"}]}]

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