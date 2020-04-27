import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, POST_SUBCATEGORY, EDIT_SUBCATEGORY, DELETE_SUBCATEGORY, DIAGRAM_RESULTS, URL } from './types';
import axios from 'axios';

// export const getSubcategories = (category) => dispatch => {
//     console.log("URL:" + URL + '/subcategories/' + category)
//     fetch(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`, {method: 'GET'})
//     .then(res => res.json(), console.log(JSON.stringify(res)))
//     .then(subcategories => console.log(subcategories.data),
//             dispatch({
//                 type: GET_SUBCATEGORIES,
//                 payload: {}
//             })
//     ).catch(err => console.log("Fetch Categories error: ", err))
// } 

export const getSubcategories = (category) => (dispatch) => {
    dispatch({ 
        type: LOADING_GET_SUBCATEGORIES,
        loading: true
    })
    const sorting = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if(nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
    axios.get(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`)
    .then(resp => { console.log("got to subcategories")
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: resp.data.subcategories.sort(sorting),
                loading: false,
                error: ''
            })   
        }).catch(err => {console.log("subcategories error", err)
            dispatch({
                type: GET_SUBCATEGORIES_ERROR,
                error: 'Failed to load subcategories list...',
                loading: false
            })
        })
} 

export const addSubcategory = (subcategory, category) => dispatch => {
    axios.post(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addSubcategory/${category}`, subcategory)
    .then((subcategory) => {
        dispatch({
            type: POST_SUBCATEGORY,
            payload: subcategory.data.subcategory,
        })
    }).catch((err) =>console.log("Error:", err.response))
}

export const editSubcategory = (subcategory, category, data) => (dispatch) => {
    axios.post( URL + `/updateSubcategory/${category}/${subcategory}`, data)
        .then(subcategory => { console.log("show: ", subcategory)
            dispatch({
                action: EDIT_SUBCATEGORY,
                payload: subcategory.data,
                id: subcategory.data.id,
            })
        }).catch(err => 
            console.log("EDIT SUBCATEGORY ERROR: ", err.response))
}

// export const editSubcategory = (subcategory, category,) => (dispatch) => {
//     axios.post( URL + `/deleteProduct/${category}/${subcategory}`, data)
//         .then(subcategory => { console.log("show: ", subcategory)
//             dispatch({
//                 action: EDIT_SUBCATEGORY,
//                 payload: subcategory.data,
//                 id: subcategory.data.id,
//             })
//         }).catch(err => 
//             console.log("EDIT SUBCATEGORY ERROR: ", err.response))
// }
export const deleteSubcategory = (subcategory) => (dispatch) => {
    axios.delete( URL + `/deleteSubcategory/${subcategory}`)
        .then(() => { 
            dispatch({
                action: DELETE_SUBCATEGORY,
                payload: subcategory,
            })
        }).catch(err => 
            console.log("EDIT SUBCATEGORY ERROR: ", err.response))
}
