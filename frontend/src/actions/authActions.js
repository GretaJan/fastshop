import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data) => (dispatch) => {
    axios.post('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/login', data, {withCredentials: true})
        .then(admin => {
            dispatch({
                type: LOGGED_IN,
                admin: admin,
                isAuthorized: true
            })
        }).catch(err => console.log("CANNOT LOGIN:", err),
            dispatch({
                type: LOG_IN_FAILED,
                payload: 'Loggin failed. Please try again.',
                admin:{},
                isAuthorized: false
            })
        );
} 

export const logOut = (admin) => (dispatch) => {
    axios.get(URL + '/logout/', admin, {withCredentials: true})
        .then((response) => { 
            dispatch({
                type: LOG_OUT,
                admin: {},
                isAuthorized: false
            })
        }
        ).catch(err => {
            console.log("logout error: ", err, "Token: ", err.response),
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        }
        );
} 