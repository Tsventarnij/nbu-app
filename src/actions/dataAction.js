import axios from "axios";

export function nbuData(object) {
    return { type: 'GET_CITIES', object}
}

export function getNbuData() {
    return (dispatch) => {
        axios.get('/city.list.js')
            .then(function (response) {


                dispatch(nbuData(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}