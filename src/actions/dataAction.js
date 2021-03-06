import axios from "axios";
import moment from "moment";

export function nbuData(object, indexCode, indexDate) {
    return { type: 'GET_NBU_DATA', object, indexCode, indexDate}
}

export function nbuDataError( indexCode, indexDate) {
    return { type: 'GET_NBU_DATA_ERROR', indexCode, indexDate}
}

export function getNbuData(code, date, indexCode, indexDate, recursive = false, attempt = 0) {
    let _this = this;
    return (dispatch) => {
        if(recursive) {
            attempt++;
            // console.log('ya vizvan OPYAT!!!!!!!!');
        }
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange', {
            params: {
                valcode: code,//"EUR",
                date: moment(date, "DD.MM.YYYY").format("YYYYMMDD"),//"20171106",
                json: "true"
            }
        })
            .then(function (response) {

                dispatch(nbuData(response.data, indexCode, indexDate));
            })
            .catch(function (error) {
                if (attempt <= 5) {
                    dispatch(getNbuData(code, date, indexCode, indexDate, true, attempt));
                }else{
                    dispatch(nbuDataError(indexCode, indexDate));
                }
                // dispatch(getNbuData(code, date, indexCode, indexDate, true));
                console.log("getNbuData", code, date, indexCode, indexDate);
                // dispatch(nbuData(response.data, indexCode, indexDate));
                console.log("error", error);
            });
    }

}
    //
    // let data = [];
    // let i = arrDate.length;
    // console.log("!!!!I!!!!", i)
    // console.log(code, arrDate, arrData)
    // return (dispatch) => {
    //     new Promise((resolve, reject) => {
    //         arrDate.forEach(date => {
    //
    //             let dateExist = false;
    //
    //             arrData.forEach(item => {
    //                 if (date === item.exchangedate && code === item.cc) {
    //                     dateExist = true;
    //                 }
    //             })
    //             if (!dateExist) {
    //                 axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange', {
    //                     params: {
    //                         valcode: code,//"EUR",
    //                         date: moment(date, "DD.MM.YYYY").format("YYYYMMDD"),//"20171106",
    //                         json: "true"
    //                     }
    //                 })
    //                     .then(function (response) {
    //                         // console.log("getNbuData -> response", { response.data.cc :[ response.data.response.data.rate, response.data.response.data.exchangedate]})
    //                         //console.log(response.data);
    //                         console.log("DATA_ACTION -> response.data", response.data[0])
    //                         console.log("I<<<<0", i)
    //                         data.push(response.data[0]);
    //                         i--;
    //                         if (!i) {
    //                             console.log(" resolve i ->", i)
    //                             resolve(data)
    //                         }
    //                     })
    //                     .catch(function (error) {
    //                         console.log(error);
    //                     });
    //             }
    //         })
    //     }).then(() => {
    //
    //         console.log(" dispatch i ->", i)
    //         dispatch(nbuData(data));
    //
    //     })

    // return null
    // console.log("DATA_ACTION -> dispatch data",data)



    // return (dispatch) => {
    //
    //             dispatch(nbuData(response.data));
    //
    // }


export function fillNbuData(arrayData, arrayDate) {
        // console.log("DataAction -> ",arrayData, arrayDate)
    return (dispatch) => {

                dispatch({ type: 'FILL_NBU_DATA', arrayData, arrayDate});

    }
}

export function startLoadingData(count) {
    // console.log("DataAction -> ",arrayData, arrayDate)
    return (dispatch) => {

        dispatch({ type: 'LOADING_DATA', count});

    }
}
//USD  https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20171106&json