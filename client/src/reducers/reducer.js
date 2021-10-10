import { GenreFilter } from "../Utils/utils"

const initialState = {
    allGames: [],
    allGenres: [],
    gameDetail: [],
    pageNumber: 1,
    actualPageGames: [],
}

export default function rootReducer(state = initialState, action)  {
    switch (action.type) {
        case "GET_ALL_GAMES":
            return {
                ...state,
                allGames: action.payload,
                actualPageGames: action.payload.slice((state.pageNumber - 1) * 15, state.pageNumber * 15) 
            }
            
        case "GET_ALL_GENRES":
            return {
                ...state,
                allGenres: action.payload
            }
        case "CLEAR_GAME_DETAILS":
            return {
                ...state,
                gameDetail: []
            }
        case "GAMES_PER_PAGE":
            return {
                ...state,
                actualPageGames: state.allGames.slice((action.payload - 1) * 15, action.payload * 15),
                pageNumber: action.payload
            }
        case "FILTER_BY_GENRE":
            return {
                ...state,
                actualPageGames: GenreFilter(state.allGames, action.payload)
            }
        default:
            return state;
    }
}