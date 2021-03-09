import { LOADING_DATA, GET_ALL_DATA, DATA_LOADED, DATA_LOAD_CANCELED, DATA_LOADED_ERROR, ADD_LIST, DELETE_LIST } from '../actions/types';

const initialState = {
    categories: [],
    allSubcategories: [],
    allProducts: [],
    allBuyLists: [],
    loadingData: false,
    dataUploadDate: null,
    dataLoadError: '',
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loadingData: true
            }
        case GET_ALL_DATA:
            return {
                ...state,
                categories: action.categories,
                allSubcategories: action.subcategories,
                allProducts: action.products,
                allBuyLists: action.buyLists,
                dataUploadedDate: action.dataUploadDate
            }
        case DATA_LOADED:
            return {
                ...state,
                loadingData: false,
                dataUploadedDate: action.dataUploadDate
            }
        case DATA_LOAD_CANCELED:
            return {
                ...state,
                loadingData: false,
                dataUploaded: false
            }
        case DATA_LOADED_ERROR:
            return {
                ...state,
                loadingData: false,
                dataLoadError: action.error
            }
        case ADD_LIST:
            return {
                ...state,
                allBuyLists: action.payload
            }
        case DELETE_LIST:
            const selectedDate = action.date;
            console.log('seleeeeCTEE: ', selectedDate);
            const dateArray = state.allBuyLists[selectedDate].filter(item => item.id !== action.id)  //get array of selected month and filter through it
            console.log('dateArray222: ', dateArray);
            const filteredArray = state.allBuyLists[selectedDate] = dateArray;
            console.log(filteredArray);
            return {
                ...state,
                allBuyLists: filteredArray
            }
        default:
            return state
    }
}