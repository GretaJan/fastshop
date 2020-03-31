import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data, history) => (dispatch) => {
    axios.post(URL + '/login', data, {withCredentials: true})
        .then(user => console.log(user),
        dispatch({
            type: LOGGED_IN,
            admin: admin,
            payload: false,
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

export const tryLogin = (data, history) => (dispatch) => {
    axios.get(URL + '/logout', data, {withCredentials: true})
        .then(user => console.log(user),
        dispatch({
            type: LOGGED_IN,
            payload: false
        }), 
        history.push('/dashboard'))
        .catch(err => console.log(err),
            dispatch({
                type: LOG_IN_FAILED,
                payload: 'Loggin failed. Please try again.'
            })
        );
} 