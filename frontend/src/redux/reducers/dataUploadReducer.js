import { LOADING_DATA, GET_ALL_DATA, DATA_LOADED, DATA_LOAD_CANCELED, DATA_LOADED_ERROR } from '../actions/types';

const initialState = {
    categories: [],
    allSubcategories: [],
    allProducts: [],
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
        default:
            return state
    }
}