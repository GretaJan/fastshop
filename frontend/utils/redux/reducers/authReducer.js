import { SAVE_USER, TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT_FAILED, LOG_OUT } from '../actions/types';

const initialState = {
    admin_name: '',
    email: '',
    password: '',
    user: {},
    token: '',
    error: null,
    isLoading: true,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SAVE_USER: 
            return {
                token: action.token,
                user: action.user,
            }
        case TRY_LOG_IN:
            return {
                ...state,
                authenticate: true
            }
        case LOGGED_IN:
            return {
                ...state,
                isLoading: action.payload,
                admin: action.admin,
                token: action.token,
                authenticate: false,
                error: null,
            }
        case LOG_IN_FAILED:
            return {
                ...state,
                error: action.payload,
                admin: action.admin,
                isAuthorized: action.isAuthorized,
                authenticate: false,
            }
        case LOG_OUT:
            return {
                ...state,
                token: '',
                user: 'logged_out'
            }
        case LOG_OUT_FAILED:
            return {
                ...state,
                logErrorMsg: action.payload,
            }
        default:
           return state;
    }
}