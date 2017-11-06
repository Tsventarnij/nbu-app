import axios from "axios";

export function currency(object) {
    return { type: 'GET_CURRENCY', object}
}

export function getCurrency() {
    return (dispatch) => {
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(function (response) {
                //console.log("getCurrency", response)
                dispatch(currency(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


