import { 
    URL, 
    LOADING_DATA, 
    CREATE_CALENDAR, 
    GET_ALL_DATA, 
    DATA_LOAD_CANCELED, 
    DATA_LOADED_ERROR,
    DATA_UPLOAD_ERROR_REMOVE,
} from './types';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

export function asyncStorageFunc(){
    return AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
        return root
    }).catch(() => {
        return null
    })
}

export const closeErrorWarning = () => dispatch => {
    dispatch({
        type: DATA_UPLOAD_ERROR_REMOVE,
    })
}

export function importAppData(token){
    function thunkFunc(dispatch) {
        dispatch({
            type: LOADING_DATA
        })
        axios.get(`${URL}/get-all-data`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }, { withCredentials: true }).then(response => {
            const respData = response.data;
            let paginatedSubcategories = paginateData(respData.subcategories, 3);
            let paginatedProducts = paginateData(respData.products, 10);
            let buyLists = respData.buy_lists;
            let currentDate = new Date().addHours(2) //add two hours to current date so app can check if user updated data earlier than two hours ago
            dispatch({
                type: GET_ALL_DATA,
                categories: respData.categories,
                subcategories: paginatedSubcategories,
                products: paginatedProducts,
                buyLists: buyLists,
                dataUploadDate: currentDate
            })
            return true
        }).catch(() => {
            dispatch({
                type: DATA_LOADED_ERROR,
                error: 'Error occurred. Please try again later',
            })
            return false
        })
    }
    // offline()
    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
        retry: false,
        name: "thunkFunc",
        rgs: token, 
    }
    return thunkFunc;
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
    return groupedArrTemp;
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

// export const generateCalendar = () => (dispatch) => {
//     const currentYear = new Date().getFullYear();
//     let array = [];
//     const startYear = 2020,
//             endYear = currentYear + 3;
//     for(let i = startYear; i <= endYear; i++){
//         let yearObj = {
//             year: i
//         }
//         const monthsArr = [];
//         for(let j = 1; j <= 12; j++){
//             const daysArr = createDaysArr(i, j)
//             const monthObj= {
//                 name: sliceFunc(j),
//                 days: daysArr
//             }
//             monthsArr.push(monthObj)
//         }
//         yearObj.months = monthsArr;
//         array.push(yearObj)
//     }
//     dispatch({
//         type: CREATE_CALENDAR,
//         payload: array
//     })
// }

// function sliceFunc(digit){
//     return (`0${digit}`).slice(-2);
// }

export function createDaysArr(year, month){
    let daysCount = 0;
    if(month == 2 ) daysCount = leapYear(year)
        else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            daysCount = 31
                else if(month == 4 || month == 6 || month == 9 || month == 11)
                    daysCount = 30
    let arr = [];
    for(let i = 1; i <= daysCount; i++){
        arr.push(i);
    }
    const daysArr = insertEmptyToDaysArr(arr, year, month)
    return daysArr
}

function leapYear(year){
    if(year % 4 === 0){
        return 29
    }
    return 28
}

function insertEmptyToDaysArr(arr, year, month){
    const lastDay = arr.length;
    let startTimes = new Date(year + "-" + month  + "-01").getDay();
        startTimes = startTimes == 0 ? '07' : startTimes;
    let endTimes = new Date(year + "-" + month + "-" + lastDay).getDay();
        endTimes = endTimes == 0 ? '07' : endTimes;
    for(let i = 1; i < startTimes; i++)
        arr.unshift('');
        for(let i = 7; i > endTimes; i--)
            arr.push('')
    return arr
}

export const removeCalendar = () => dispatch => {
    dispatch({
        type: CREATE_CALENDAR,
        payload: []
    })
}
