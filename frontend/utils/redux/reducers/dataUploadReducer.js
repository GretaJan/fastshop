import { 
    LOADING_DATA, 
    GET_ALL_DATA, 
    DATA_LOADED, 
    DATA_LOAD_CANCELED, 
    DATA_LOADED_ERROR, 
    DATA_UPLOAD_ERROR_REMOVE,
    ADD_LIST, 
    DELETE_LIST,
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    SAVE_RESULT,
    REMOVE_RESULT
} from '../actions/types';

const initialState = {
    categories: [],
    allSubcategories: [],
    allProducts: [],
    allBuyLists: [],
    likedProducts: [],
    savedResults: [],
    loadingData: false,
    dataUploadDate: null,
    dataUploaded: null,
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
                dataUploadedDate: action.dataUploadDate,
                dataUploaded: true,
                loadingData: false
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
        case DATA_UPLOAD_ERROR_REMOVE: 
            return {
                ...state,
                dataLoadError: ''
            }
        case ADD_LIST:
            const actionDate = action.date;
            const actionData = action.data
            let lists = {...state.allBuyLists};
            if(lists[actionDate] == undefined){
                lists[actionDate] = [actionData]
            } else {
                lists[actionDate].push(actionData)
            }
            return {
                ...state,
                allBuyLists: lists
            }
        case DELETE_LIST:
            const selectedDate = action.date;
            const dateArray = state.allBuyLists[selectedDate].filter(item => item.created_at !== createdAt)  //get array of selected month and filter through it
            const filteredArray = state.allBuyLists[selectedDate] = dateArray;
            return {
                ...state,
                allBuyLists: filteredArray
            }
        case LIKE_PRODUCT:
            return {
                ...state,
                likedProducts: state.likedProducts.concat(action.productId),
                allProducts: action.array,
            }
        case UNLIKE_PRODUCT:
            return {
                ...state,
                likedProducts: state.likedProducts.filter(item => item.id != action.productId),
                allProducts: action.array,
            }
        case SAVE_RESULT:
            return {
                ...state,
                savedResults: state.savedResults.concat(action.payload),
            }
        case REMOVE_RESULT:
            return {
                ...state,
                savedResults: state.savedResults.filter(item => item.created_at !== action.payload),
            }
        default:
            return state
    }
}