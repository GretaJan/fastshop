import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data, history) => (dispatch) => {
    console.log("CAT URL: ", URL)
    axios.post(URL + '/login', data, {withCredentials: true})
        .then(admin => console.log("GOT user: ", admin.data.access_token),
        dispatch({
            type: LOGGED_IN,
            admin: {},
            token: ''
        }),
        history.push('/dashboard'))
        .catch(err => console.log("CANNOT LOGIN:", err),
            dispatch({
                type: LOG_IN_FAILED,
                payload: 'Loggin failed. Please try again.'
            })
        );
} 

export const logOut = (token, history) => (dispatch) => {
    axios.get(URL + '/logout', token, {withCredentials: true})
        .then(user => console.log(user),
        dispatch({
            type: LOGGED_OUT,
            token: AsyncStorage.removeItem('admin_token'),
            admin: {}
        }), 
        history.push('/'))
        .catch(err => console.log(err),
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        );
} 