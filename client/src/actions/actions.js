export function getAllGames() {
    return async function(dispatch) {
      let games = await fetch('/videogames')
      games = await games.json()
      dispatch({type: "GET_ALL_GAMES", payload: games})
    }
}

export function getGameDetails(id) {
  return async function(dispatch) {
    let game = await fetch(`/videogames/${id}`)
    game = await game.json()
    dispatch({type: "GAME_DETAIL", payload: game})
  }
}

export function clearGameDetails() {
  return {type: "CLEAR_GAME_DETAILS"}
}

export function GamesOnPageChange(page) {
  return {type: "GAMES_PER_PAGE", payload: page}
}

export function filterByGenre(type) {
  return {type: "FILTER_BY_GENRE", payload: type}
}

export function getAllGenres() {
  return async function (dispatch) {
    let genres = await fetch('/genres')
    genres = await genres.json()
    dispatch({type: "GET_ALL_GENRES", payload: genres})
  }
}