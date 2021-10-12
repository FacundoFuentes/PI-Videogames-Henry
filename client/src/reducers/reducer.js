import { GenreFilter, BDorAPIFilter, orderAZ, orderRating } from "../Utils/utils"

const initialState = {
    allGames: [],
    allGamesCopy: [],
    allGenres: [],
    gameDetail: [],
    pageNumber: 1,
    actualPageGames: [],
    search: true,
}

export default function rootReducer(state = initialState, action)  {
    switch (action.type) {
        case "GET_ALL_GAMES":
            return {
                ...state,
                allGames: [...action.payload],
                allGamesCopy: action.payload,
                actualPageGames: action.payload.slice((state.pageNumber - 1) * 15, state.pageNumber * 15) 
            }   
        case "GET_ALL_GENRES":
            return {
                ...state,
                allGenres: action.payload
            }
        case "GAME_DETAIL":
            return {
                ...state,
                gameDetail: action.payload
            }
        case "CLEAR_GAME_DETAILS":
            return {
                ...state,
                gameDetail: []
            }
        case "GAMES_PER_PAGE":
            return {
                ...state,
                actualPageGames: state.allGamesCopy.slice((action.payload - 1) * 15, action.payload * 15),
                pageNumber: action.payload
            }
        case "FILTER_BY_GENRE":
            let orderedGenre = GenreFilter(state.allGames, action.payload)
            return {
                ...state,
                allGamesCopy: orderedGenre,
                actualPageGames: orderedGenre.slice(0, 15),
                pageNumber: 1
            }
        case "FILTER_BD_API":
            let orderedBDAPI = BDorAPIFilter(state.allGames, action.payload)
            return {
                ...state,
                allGamesCopy: orderedBDAPI,
                actualPageGames: orderedBDAPI.slice(0, 15),
                pageNumber: 1
            }
        case "FILTER_AZ":
            let orderedAZ = orderAZ(state.allGamesCopy, action.payload)
            return {
                ...state,
                allGamesCopy: orderedAZ,
                actualPageGames: orderedAZ.slice(0, 15),
                pageNumber: 1
            }
        case "FILTER_RATING":
            let orderedR = orderRating(state.allGamesCopy, action.payload)
            return{
                ...state,
                allGamesCopy: orderedR,
                actualPageGames: orderedR.slice(0,15),
                pageNumber: 1
            }
        case "RESET_FILTERS":
            return {
                ...state,
                actualPageGames: state.allGames.slice(0, 15),
                allGamesCopy: state.allGames
            }
        case "SEARCH_GAME":
            return {
                ...state,
                allGamesCopy: action.payload,
                actualPageGames: action.payload,
                pageNumber: 1
            }
        case "USER_SEARCH":
            return{
                ...state,
                search: action.payload
            }
        default:
            return state;
    }
}