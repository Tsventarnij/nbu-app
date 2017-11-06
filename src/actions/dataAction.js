import axios from "axios";

export function nbuData(object) {
    return { type: 'GET_NBU_DATA', object}
}

export function getNbuData(code, date) {
    //console.log("DataAction ->getNbuData")
    return (dispatch) => {
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange', {
                 params: {
                     valcode: code,//"EUR",
                     date: date,//"20171106",
                     json: "true"
                 }
            })
            .then(function (response) {
                // console.log("getNbuData -> response", { response.data.cc :[ response.data.response.data.rate, response.data.response.data.exchangedate]})
                //console.log(response.data);

                dispatch(nbuData(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

//USD  https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20171106&json