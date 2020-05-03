import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, clear_results, SORT_ARRAY, GO_TO_LIST, DIAGRAM_RESULTS } from '../actions/types';

const initialState = {
    comparisonArray: [],
    result: {},
    calculated: false,
    sorted: null,
    activeEnergyDesc: false,
    activeEnergyAsc: false,
    activeFatDesc: false,
    activeFatAsc: false,
    activeSaturDesc: false,
    activeSatursc: false,
    activeCarbsDesc: false,
    activeCarbsAsc: false,
    activeSugarDesc: false,
    activeSugarAsc: false,
    activeSaltDesc: false,
    activeSaltAsc: false,
    activeVitaminsDesc: false,
    activeVitaminsAsc: false,   
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
                var pushToArray = state.comparisonArray.concat(action.payload);
                var filteredArray = Array.from(new Set(pushToArray.map(item => item.id)))
                .map(id => {
                    return pushToArray.find(firstItem => firstItem.id === id)
                })
            return {
                ...state,
                comparisonArray: filteredArray,
                calculated: action.calculated,
                result: action.result,
                diagram: action.diagram,
            }

        case REMOVE_SELECTED_PRODUCT: 
            return {
                ...state,
                comparisonArray: state.comparisonArray.filter((item) => (
                    action.payload !== item.id
               )),
               result: {},
               diagram: {},
            }
        case COMPARE_RESULT:
            return {
                ...state,
                result: action.payload,
                calculated: action.calculated,
            }
        case SORT_ARRAY: 
        return {
            ...state,
            comparisonArray: action.payload,
            sorted: action.sorted
        }
        case GO_TO_LIST: 
        console.log("go to list selector")
        return {
            ...state,
            sorted: action.sorted
        }
        case clear_results: 
            return {
                ...state,
                comparisonArray: action.array,
                result: action.result,
                diagram: action.diagram,
                calculated: action.calculated
            }
        default:
            return state
    }
}