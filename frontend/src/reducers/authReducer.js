import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT_FAILED, LOG_OUT } from '../actions/types';

const initialState = {
    admin_name: '',
    email: '',
    password: '',
    admin: {},
    logErrorMsg: null,
    isLoading: true,
    token: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TRY_LOG_IN:
            return {
                ...state,
                isLoading: true
            }
            case LOGGED_IN:
                return {
                    ...state,
                    isLoading: action.payload,
                    admin: action.admin,
                    token: action.token
                }
            case LOG_IN_FAILED:
                return {
                    ...state,
                    logErrorMsg: action.payload,
                    admin: null,
                    token: action.token
                }
            case LOG_OUT:
            return {
                ...state,
                admin: action.admin,
                // token: action.token
            }
            case LOG_OUT_FAILED:
            return {
                ...state,
                logErrorMsg: action.payload,
                // admin: action.admin,
                // token: action.token
            }
        default:
           return state;
    }
}