import { URL, GET_BYU_LISTS, BUY_LIST_BY_DATE, ADD_LIST, DELETE_LIST } from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


function asyncStorageFunc(){
    return AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
        return root
    }).catch(() => {
        return null
    })
}

export const getAllBuyLists = dispatch => {
    axios.post(`${URL}/api/get-buy-lists`, data, {
        headers: {
            authorization: `Bearer ${ token }`
        }
    }, { withAutorization: true }).then((response) => {
        dispatch({
            type: GET_BYU_LISTS,
        })
    }).catch((error) => {
        console.log("error", error)
    })
}

export function getBuyListsByDate(date) {
    return AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
        let dataReducer = JSON.parse(root.dataUpload);
        let lists = dataReducer.allBuyLists[date];
        if(lists && lists.length > 0) {
            lists = lists.map(item => {
                const day = item.date.split('-')[2]
                return {
                    years: date,
                    day: day
                }
            })
            return lists
        } 
        return false
    }).catch(() => {
        return false
    })
}

export function getListByDay(year, day){
    // return AsyncStorage.getItem("persist:root").then((value) => {
    //     let root = JSON.parse(value);
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[year];
        let list = lists.filter(item => item.date.split('-')[2] == day)
        list.forEach((item, index) => {
            let totalProducts = 0;
            let checkedProducts = 0;
            let itemList = item.list;
            if(itemList){
                totalProducts = item.list.length
                itemList.forEach((listItem) => {
                    if(listItem.checked == true){
                        checkedProducts++;
                    }
                })
            }
            list[index].totalItems = totalProducts;
            list[index].checkedItems = checkedProducts;
        })
        return list
    }).catch(() => {
        return []
    })
} 

export async function getSingleList(id, date){
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[date];
        let list = lists.find(item => item.id == id)
        return list
    }).catch(() => {
        return null
    })
}

export function getRelatedProducts(ids){
    return AsyncStorage.getItem("persist:root").then(value => {
        let root = JSON.parse(value);
        let dataReducer = JSON.parse(root.dataUpload);
        let products = dataReducer.allProducts;
        let getRelatedProducts = [];
        ids.forEach(id => {
            products.forEach((productPage) => {
                productPage.data.forEach((data) => {
                    const related = data.find(item => item.id == id)
                    if(related) getRelatedProducts.push(related)
                })
              ;
            })
          
        })
        return getRelatedProducts
    }).catch(() => {
        return null
    })
}

function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

export function createDaysArr(year, month){
    let daysCount = 0;
    if(month == 2 ) daysCount = leapYear(year)
        else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            daysCount = 31
                else if(month == 4 || month == 6 || month == 9 || month == 11)
                    daysCount = 30
    let arr = [];
    for(let i = 1; i <= daysCount; i++){
        const spliceDay = sliceFunc(i)
        arr.push(spliceDay);
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

async function createList(dispatch, selectedDate, currentDate){
    const currentDateInit = new Date();
    return AsyncStorage.getItem("persist:root").then(value => {
        let root = JSON.parse(value);
        let dataReducer = JSON.parse(root.dataUpload);
        let lists = dataReducer.allBuyLists;
        let newId;
       if(lists.length > 0){
            const lastList = lists[Object.keys(lists)[Object.keys(lists).length - 1]];
            const lastItemId = lastList[lastList.length - 1].id
            newId = lastItemId + 1;
       } else {
            newId = 1;
       }
        const dateHours =  `${sliceFunc(currentDateInit.getHours())}:${sliceFunc(currentDateInit.getMinutes())}:${sliceFunc(currentDateInit.getSeconds())}`
        const newData = {
            id: newId,
            name: dateHours,
            date: selectedDate.fullDate,
            created_at: `${currentDate} ${dateHours}`,
            updated_at: `${currentDate} ${dateHours}`
        }
        if(!lists[selectedDate.keyDate]){
            lists[selectedDate.keyDate] = [newData]
        } else {
            lists[selectedDate.keyDate].push(newData)
        }
        dispatch({
            type: ADD_LIST,
            payload: lists,
        })
        return newId
    }).catch(() => {
        return null
    })
}

function updateList(dispatch, selectedDate, data){

    return AsyncStorage.getItem("persist:root").then(value => {
        let root = JSON.parse(value);
        let dataReducer = JSON.parse(root.dataUpload);
        let lists = dataReducer.allBuyLists[selectedDate];
        let list = lists.find(item => item.id === data.id)
        console.log("liiist", list)
        dispatch({
            type: ADD_LIST,
            payload: lists,
        })
        return true
    }).catch(() => {
        return null
    })
}

// export const createUpdateListRedux = (selectedDate, currentDate) => dispatch => {
//     const listData = createList(dispatch, selectedDate, currentDate)
//     return listData.then((response) => {
//         return response
//     })
// }

export const createUpdateListRedux = (selectedDate, currentDate, editData) => {
    let data = {
        id: id,
        date: selectedDate.fullDate
    }
    if(editData){
        data = editData
    }
    function thunkFunc(dispatch) {
        asyncStorageFunc().then(response => {
            let dataReducer = JSON.parse(response.auth);
            let token = dataReducer.token;
            return token;
        }).then((token) => {
            axios.post(`${ URL }/update-create-checklist`, data, { 
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }, { withAutorization: true }).then(response => {
                    console.log("response", response)
                }).catch(error => {
                    console.log("Error", error.response)
                })
        })
        let listData;
        if(id){
            listData = updateList(dispatch, selectedDate, currentDate)
        } else {
            listData = createList(dispatch, selectedDate, editData)
        }
        return listData.then((response) => {
            return response
        })
    }
    // offline()
    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
        retry: true,
        name: 'thunkFunc', // This should be the name of your function
        args: data, // These are the arguments for the function. Add more as needed.
    };
    return thunkFunc;
}

export function deleteList(date, id){
    function thunkFunc(dispatch) {
        asyncStorageFunc().then(response => {
            let dataReducer = JSON.parse(response.auth);
            let token = dataReducer.token;
            return token;
        }).then((token) => {
            axios.delete(`${ URL }/delete-buy-list/${ id }`, { 
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }, { withAutorization: true }).then(response => {
                    console.log("response", response)
                }).catch(error => {
                    console.log("Error", error.response)
                })
        })
        let listData = deleteListLocal(dispatch, date, id)
        return listData.then((response) => {
            return response
        })
    }
    // offLine()
    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
        retry: true,
        name: 'thunkFunc', // This should be the name of your function
    };
    return thunkFunc;
}

function deleteListLocal(dispatch, date, id){
    dispatch({
        type: DELETE_LIST,
        date: date,
        id: id
    })
}

