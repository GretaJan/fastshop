import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data) => (dispatch) => {
    dispatch({
        type: TRY_LOG_IN,
        authenticate: true
    });
    axios.post(URL + '/login', data, {withCredentials: true})
        .then(admin => {console.log(admin)
            dispatch({ 
                type: LOGGED_IN,
                admin: admin,
                isAuthorized: true,
                error: null,
                authenticate: false
            })
        }).catch(err => { 
            // if(err.response.status == 422) {
            //     var errorResponse = 'Submitted with empty fields. Please try again.';
            // } else if (err.response.status == 401) {
            //     var errorResponse = 
            // } 
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
        .then((response) => { console.log("logged out", response),
            dispatch({
                type: LOG_OUT,
                admin: {},
                isAuthorized: false
            })
        }
        ).catch(err => {
            dispatch({
                type: LOG_OUT_FAILED,
                payload: 'Loggout failed. Please try again.'
            })
        }
        );
    // dispatch({
    //     type: LOG_OUT,
    //     admin: {},
    //     isAuthorized: false
    // })
} 