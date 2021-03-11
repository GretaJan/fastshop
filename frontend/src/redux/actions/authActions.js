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

export function logOut(token) {
    function thunkFunc(dispatch){
        console.log("token", token)
        axios.get(`${ URL }/logout`, {
            headers: { Authorization: `Bearer ${ token }` }
        }, { withCredentials: true }).catch((error) => {
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        });
        dispatch({
            type: LOG_OUT,
        })
    }
    // offLine()
    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
        retry: true,
        name: "thunkFunc",
    };
    console.log("thunkFunc", token)
    return thunkFunc
} 