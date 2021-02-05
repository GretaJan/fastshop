
export const closeErrorWarning = (actionType) => (dispatch) => {
    dispatch({
        type: actionType,
    })
}