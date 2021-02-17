import { URL, LOADING_DATA, DATA_LOADED, GET_ALL_DATA, DATA_LOAD_CANCELED, DATA_LOADED_ERROR } from './types';
import axios from 'axios';

export const closeErrorWarning = (actionType) => (dispatch) => {
    dispatch({
        type: actionType,
    })
}

export const importAppData = (token) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })
    axios.get(`${URL}/get-all-data`, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    }, { withCredentials: true })
        .then(response => {
            const respData = response.data;
            let paginatedSubcategories = paginateData(respData.subcategories, 3);
            let paginatedProducts = paginateData(respData.products, 10)
            let currentDate = new Date().addHours(2) //add two hours to current date so app can check if user updated data earlier than two hours ago
            console.log
            dispatch({
                type: GET_ALL_DATA,
                categories: respData.categories,
                subcategories: paginatedSubcategories,
                products: paginatedProducts,
                dataUploadDate: currentDate
            })
        }).catch(error => {
            dispatch({
                type: DATA_LOADED_ERROR,
                error: 'Error occurred. Please try again later',
            })
        })
}

export const cancelDataUpload = () => dispatch => {
    dispatch({
        type: DATA_LOAD_CANCELED
    })
}

function paginateData(groupedArr, count){
    let groupedArrTemp = [];
    for(const [id, singleArr] of Object.entries(groupedArr)){
        const arrayLength = singleArr.length;
        let pageNum = (arrayLength <= count) ? 1 : Math.ceil(arrayLength / count);
        let tempArr = [];
        let iStart = 0;
        for(let i = 1; i <= pageNum; i++){
            let currentArr = [];
            for(let j = iStart; j < arrayLength; j++){
                currentArr.push(singleArr[j]);
                if(((j + 1) / i) == count){ //check if item index multiply page num equals count
                    tempArr.push(currentArr);
                    iStart = j + 1;
                    break;
                } else if(i === pageNum && (arrayLength - 1) == j){ //include last page elements
                    console.log("currrent arrr: ", currentArr)
                    tempArr.push(currentArr);
                }
            }
        }
        const object = {
            parentId: id,
            lastPage: pageNum,
            data: tempArr
        }
        groupedArrTemp.push(object);
    }
    console.log("groupedArrTemp", groupedArrTemp)
    return groupedArrTemp;
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }