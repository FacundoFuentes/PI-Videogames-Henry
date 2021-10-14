export function getAllGames() {
    return async function(dispatch) {
      let games = await fetch('/videogames')
      games = await games.json()
      dispatch({type: "GET_ALL_GAMES", payload: games})
    }
}

export function getAllGenres() {
  return async function (dispatch) {
    let genres = await fetch('/genres')
    genres = await genres.json()
    dispatch({type: "GET_ALL_GENRES", payload: genres})
  }
}

export function getGameDetails(id) {
  return async function(dispatch) {
    let game = await fetch(`/videogames/details/${id}`)
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

export function filterBDorAPI(type) {
  return {type: "FILTER_BD_API", payload: type}
}

export function orderAZ(boolean) {
  return {type: "FILTER_AZ", payload: boolean}
}

export function orderRating(boolean) {
  return {type: "FILTER_RATING", payload: boolean}
}

export function resetFilters() {
  return {type: "RESET_FILTERS"}
}

export function searchGame(game) {
  return async function(dispatch) {
    let gameSearch = await fetch(`/videogames/?name=${game}`)
    gameSearch = await gameSearch.json()
    dispatch({type: "SEARCH_GAME", payload: gameSearch})
  }
}

export function userSearch(bool) {
  return {type: "USER_SEARCH", payload: bool}
}