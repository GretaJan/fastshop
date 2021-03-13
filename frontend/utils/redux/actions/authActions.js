import { SAVE_USER, TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from './types';
import axios from 'axios';

export const saveUserToken = (token, user) => dispatch => {
    dispatch({
        type: SAVE_USER,
        token: token,
        user: user
    })
}

export const tryLogin = (data) => (dispatch) => {
    dispatch({
        type: TRY_LOG_IN,
    });
    axios.post(`${ URL }/login`, data, { withCredentials: true })
        .then((admin) => {
            dispatch({ 
                type: LOGGED_IN,
                admin: admin,
                token: admin.access_token,
                error: null,
            })
        }).catch(err => { 
                dispatch({
                    type: LOG_IN_FAILED,
                    payload: err.response.data.message,
                })
            }
        );
} 

function onlineLogout(dispatch, token){
    axios.get(`${ URL }/logout`, {
        headers: { Authorization: `Bearer ${ token }` }
    }, { withCredentials: true }).catch((error) => {
        dispatch({
            type: LOG_OUT_FAILED,
            payload: 'Loggout failed. Please try again.'
        })
    });
}

export function logOut(token) {
    function onlineFunc(dispatch){
        onlineLogout(dispatch, token)
    }
    function offlineLogout(dispatch){
        dispatch({
            type: LOG_OUT,
        })
    }
    offlineLogout()
    // offLine()
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
    };
    return onlineFunc
} 