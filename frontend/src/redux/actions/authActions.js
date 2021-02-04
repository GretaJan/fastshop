import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from './types';
import axios from 'axios';

export const tryLogin = (data) => (dispatch) => {
    dispatch({
        type: TRY_LOG_IN,
        authenticate: true
    });
    axios.post(URL + '/login', data, {withCredentials: true})
        .then((admin) => {
            dispatch({ 
                type: LOGGED_IN,
                admin: admin,
                token: admin.access_token,
                isAuthorized: true,
                error: null,
                authenticate: false
            })
        }).catch(err => { 
                dispatch({
                    type: LOG_IN_FAILED,
                    payload: err.response.data.message,
                    admin:{},
                    isAuthorized: false,
                    authenticate: false
                })
            }
        );
} 

export const logOut = (admin) => (dispatch) => {
    axios.get(URL + '/logout', {headers: {'Authorization': 'Bearer ' + admin.data.access_token }}, {withCredentials: true})
        .then(() => { 
            dispatch({
                type: LOG_OUT,
                admin: {},
                isAuthorized: false
            })
        }
        ).catch(() => {
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        }
        );
} 