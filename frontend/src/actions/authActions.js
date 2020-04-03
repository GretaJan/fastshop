import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data, history) => (dispatch) => {
    axios.post('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/login', data, {withCredentials: true})
        .then(admin => { console.log("admin: ", admin , "ACCESS TOKEN: ", admin.response),
            dispatch({
                type: LOGGED_IN,
                admin: admin.data,
                isAuthorized: true
            }),
            history.push('/dashboard')
        }).catch(err => console.log("CANNOT LOGIN:", err),
            dispatch({
                type: LOG_IN_FAILED,
                payload: 'Loggin failed. Please try again.',
                admin:{},
                isAuthorized: false
            })
        );
} 

export const logOut = (admin, history) => (dispatch) => {
    console.log("admin start: ", admin);
    axios.get(URL + '/logout/' + admin, {withCredentials: true})
        .then(admin => console.log(admin),
        dispatch({
            type: LOG_OUT,
            admin: {},
            isAuthorized: false
        }), 
        history.push('/'))
        .catch(err => console.log(err),
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        );
} 