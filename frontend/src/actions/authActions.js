import { TRY_LOG_IN, LOGGED_IN, LOG_IN_FAILED, LOG_OUT, LOG_OUT_FAILED, URL } from '../actions/types';
import axios from 'axios';

export const tryLogin = (data) => (dispatch) => {
    axios.post('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/login', data, {withCredentials: true})
        .then(admin => {console.log(admin)
            dispatch({ 
                type: LOGGED_IN,
                admin: admin,
                isAuthorized: true,
                error: null,
            })
        }).catch(err => { 
            if(err.response.status == 422) {
                var errorResponse = 'Submitted empty fields. Please try again.';
            } else if (err.response.status == 401) {
                var errorResponse = err.response.data.message;
            } 
                dispatch({
                    type: LOG_IN_FAILED,
                    payload: errorResponse,
                    admin:{},
                    isAuthorized: false
                })
            }
        );
} 

export const logOut = (admin) => (dispatch) => {
    // axios.get(URL + '/logout/', (admin.data.token_type + " " + admin.data.access_token), {withCredentials: true})
    //     .then((response) => { console.log("logged out"),
    //         dispatch({
    //             type: LOG_OUT,
    //             admin: {},
    //             isAuthorized: false
    //         })
    //     }
    //     ).catch(err => {
    //         console.log("logout error: ", err, "Token: ", err.response),
    //         dispatch({
    //             type: LOG_OUT_FAILED,
    //             payload: 'Loggout failed. Please try again.'
    //         })
    //     }
    //     );
    dispatch({
        type: LOG_OUT,
        admin: {},
        isAuthorized: false
    })
} 