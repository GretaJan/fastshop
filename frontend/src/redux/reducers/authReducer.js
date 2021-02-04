import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT_FAILED, LOG_OUT } from '../actions/types';

const initialState = {
    admin_name: '',
    email: '',
    password: '',
    admin: {},
    authenticate: null,
    isAuthorized: false,
    token: '',
    error: null,
    isLoading: true,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TRY_LOG_IN:
            return {
                ...state,
                authenticate: action.authenticate
            }
            case LOGGED_IN:
                return {
                    ...state,
                    isLoading: action.payload,
                    admin: action.admin,
                    token: action.token,
                    isAuthorized: action.isAuthorized,
                    authenticate: action.authenticate,
                    error: null,
                }
            case LOG_IN_FAILED:
                return {
                    ...state,
                    error: action.payload,
                    admin: action.admin,
                    isAuthorized: action.isAuthorized,
                    authenticate: action.authenticate,
                }
            case LOG_OUT:
            return {
                ...state,
                admin: action.admin,
                isAuthorized: action.isAuthorized
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