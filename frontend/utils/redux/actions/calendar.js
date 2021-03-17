import { URL, ADD_LIST, DELETE_LIST } from "./types";
import { asyncStorageFunc } from './generalActions';
import axios from "axios";


function sliceFunc(digit){
    return (`0${digit}`).slice(-2);
}

export function getBuyListsByDate(date) {
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[date];
        if(lists && lists.length > 0) {
            lists = lists.map(item => {
                const day = item.date.split("-")[2]
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
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[year];
        let list = lists.filter(item => item.date.split("-")[2] == day)
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

export function getSingleList(createdAt, date){
    return asyncStorageFunc().then(async response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[date];
        let list = lists.find(item => item.created_at == createdAt)
        return list
    }).catch(() => {
        return null
    })
}

export function getRelatedProducts(createdAt){
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let products = dataReducer.allProducts;
        let getRelatedProducts = [];
        createdAt.forEach(date => {
            products.forEach((productPage) => {
                productPage.data.forEach((data) => {
                    const related = data.find(item => item.created_at == date)
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
        startTimes = startTimes == 0 ? "07" : startTimes;
    let endTimes = new Date(year + "-" + month + "-" + lastDay).getDay();
        endTimes = endTimes == 0 ? "07" : endTimes;
    for(let i = 1; i < startTimes; i++)
        arr.unshift("");
        for(let i = 7; i > endTimes; i--)
            arr.push("")
    return arr
}

async function createList(dispatch, selectedDate, data){
    dispatch({
        type: ADD_LIST,
        date: selectedDate.keyDate,
        data: data
    })
}

function updateList(dispatch, selectedDate, data){
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let lists = dataReducer.allBuyLists[selectedDate];
        let itemIndex = lists.map(item => item.created_at).indexOf(data.createdAt)
        lists[itemIndex] = data;
        dispatch({
            type: ADD_LIST,
            payload: lists,
        })
        return true
    }).catch(() => {
        return null
    })
}

function updateCreateListOnline(data){
    asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.auth);
        let token = dataReducer.token;
        return token;
    }).then((token) => {
        axios.post(`${ URL }/update-create-checklist`, data, { 
            headers: {
                authorization: `Bearer ${ token }`
            }
        }, { withAutorization: true })
    })
}

function updateCreateListOffline(dispatch, editData, selectedDate, data){
    if(editData){
        updateList(dispatch, selectedDate, data)
    } else {
        createList(dispatch, selectedDate, data)
    }
    return createdAt
}

export const createUpdateListRedux = (selectedDate, data) => {
    function onlineEditCreate(dispatch) {
        asyncStorageFunc().then(response => {
            let dataReducer = JSON.parse(response.auth);
            let token = dataReducer.token;
            return token;
        }).then((token) => {
            axios.post(`${ URL }/update-create-checklist`, data, { 
                headers: {
                    authorization: `Bearer ${ token }`
                }
            }, { withAutorization: true })
        }).catch((error) => console.log("Error", error))
        if(data.list){
            updateList(dispatch, selectedDate, data)
        } else {
            createList(dispatch, selectedDate, data)
        }
    }
    // offline()
    onlineEditCreate.interceptInOffline = true;
    onlineEditCreate.meta = {
        retry: true,
        name: "onlineEditCreate", 
        args: data, 
    };
    console.log("onlineEditCreate.meta", onlineEditCreate.meta)
    return onlineEditCreate
}

function offLine(onlineEditCreate, data){
    // offline()
    onlineEditCreate.interceptInOffline = true;
    onlineEditCreate.meta = {
        retry: true,
        name: "onlineEditCreate", 
        args: data, 
    };
    return onlineEditCreate
}

function onlineDeleteList(){
    // asyncStorageFunc().then(response => {
    //     let dataReducer = JSON.parse(response.auth);
    //     let token = dataReducer.token;
    //     return token;
    // })
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
}

function deleteListLocal(dispatch, date, createdAt){
    dispatch({
        type: DELETE_LIST,
        date: date,
        createdAt: createdAt
    })
}

export function deleteList(date, id){
    function onlineFunc() {
        onlineDeleteList()
    }
      
    function offlineFunc(){
        let listData = deleteListLocal(dispatch, date, createdAt)
        return listData.then((response) => {
            return response
        })
    }
    // offLine()
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc", 
    };
    return offlineFunc;
}


