
export function date(object) {
    return { type: 'SET_DATE', object}
}

export function setDate(object) {

    return (dispatch) => {
       // console.log("setDate", object)

        dispatch(date(object));

    }
}