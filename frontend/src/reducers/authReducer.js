import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED } from '../actions/types';
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';
import { Actions } from 'react-native-router-flux';

const initialState = {
    admin_name: '',
    admin_email: '',
    admin_pass: '',
    admin: {},
    authorized: false,
    logErrorMsg: null,
    isLoading: true
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
                    authorized: action.payload
                }
            case LOG_IN_FAILED:
                return {
                    ...state,
                    logErrorMsg: action.payload,
                    authorized: false
                }
        default:
           return state;
    }
}