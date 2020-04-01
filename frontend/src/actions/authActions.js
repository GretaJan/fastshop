import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data, history) => (dispatch) => {
    axios.post(URL + '/login', data, {withCredentials: true})
        .then(user => console.log("GOT user: ", user),
        AsyncStorage.setItem('admin_token', admin),
        dispatch({
            type: LOGGED_IN,
            admin: admin,
            authorized: true,
            token: AsyncStorage.getItem('admin_token')
        }), 
        history.push('/dashboard'))
        .catch(err => console.log(err),
            dispatch({
                type: LOG_IN_FAILED,
                payload: 'Loggin failed. Please try again.'
            })
        );
        // dispatch({
        //     type: LOGGED_IN,
        //     payload: false
        // }), 
        // history.push('/dashboard')
} 

export const logOut = (token, history) => (dispatch) => {
    axios.get(URL + '/logout', token, {withCredentials: true})
        .then(user => console.log(user),
        dispatch({
            type: LOGGED_OUT,
            authorized: false,
            admin: {}
        }), 
        // AsyncStorage.removeItem('admin_token'),
        history.push('/'))
        .catch(err => console.log(err),
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        );
} 