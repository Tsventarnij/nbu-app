import axios from "axios";

export function currency(object, type) {
    return { type: type, object}
}

export function getCurrency() {
    return (dispatch) => {
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(function (response) {
                //console.log("getCurrency", response)
                const transData = response.data.map(function(item){
                  return {
                    value: item.cc,
                    label: item.txt}
                })

                transData.sort(function (a, b) {
                    if (a.label > b.label) {
                        return 1;
                    }
                    if (a.label < b.label) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                });

                dispatch(currency(transData, 'GET_CURRENCY'));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function setCurrency(object) {

    return (dispatch) => {
        // console.log("setDate", object)

        dispatch(currency(object, 'SET_CURRENC'));

    }
}