import moment from 'moment';

const defaultInit={
    isLoading:0,

    data:[]
}
// function randomColor(){
//     // let color=Math.round(Math.random()*80+140)+", "+Math.round(Math.random()*80+140)+", "+Math.round(Math.random()*80+140)+", ";
//
//     return color;
// }

function getArrayDate(format, date){

    const startDate=moment(date.startDate, "DD.MM.YYYY");
    const endDate= moment(date.endDate, "DD.MM.YYYY");
    let contDate=[startDate.format(format)];
    if(endDate.diff(startDate, "years")<2) {
        while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
            contDate.push(startDate.add(1, 'day').format(format))
        }
    }else{
        alert("Too long a gap between dates");
    }
    return contDate;
}


export default function selectCurrencReducer(state = defaultInit, action) {
    let data = [];
    let count = 0;
    console.log("selectCurrencReducer state->", state, "action", action)
    switch (action.type) {
        case "GET_NBU_DATA_ERROR":
            data = state.data;
            count = state.isLoading -1;
            data[action.indexCode].data[action.indexDate]=data[action.indexCode].data[action.indexDate-1];
            return {
                isLoading : count,
                data: data}

        case "GET_NBU_DATA":
            // console.log("state",state, "action", action)
            data = state.data;
            count = state.isLoading -1;
            data[action.indexCode].data[action.indexDate]=action.object[0].rate;
            console.log("GET_NBU_DATA ->data [",action.indexCode, "][",action.indexDate,"]=",action.object[0].rate)
            return {
                isLoading : count,
                data: data}
            // [
            //     ...state,
            //     ...action.object
            // ]
        case "LOADING_DATA":

            return {
                isLoading : action.count,
                data: state.data}


        case "SET_CURRENC":


           return {
                isLoading : state.isLoading,
               data: action.object.map(function (item, index) {

                   const color = [
                       "150,210,210,",
                       "210,150,210,",
                       "210,210,150,",
                       "150,150,210,",
                       "210,150,150,",
                       "150,210,150,"
                   ]
                   //let data =[];
                   //console.log("Select Currenc this", )

                   return ({
                       label: item.value,
                       fill: true,
                       lineTension: 0.1,
                       backgroundColor: "rgba(" + color[index] + "0.4)",
                       borderColor: "rgba(" + color[index] + "1)",
                       borderCapStyle: 'butt',
                       borderDash: [],
                       borderDashOffset: 0.0,
                       borderJoinStyle: 'miter',
                       pointBorderColor: "rgba(" + color[index] + "1)",
                       pointBackgroundColor: '#fff',
                       pointBorderWidth: 1,
                       pointHoverRadius: 5,
                       pointHoverBackgroundColor: "rgba(" + color[index] + "1)",
                       pointHoverBorderColor: 'rgba(220,220,220,1)',
                       pointHoverBorderWidth: 2,
                       pointRadius: 1,
                       pointHitRadius: 5,
                       data: []
                   })

               })
           }
        case "FILL_NBU_DATA":
           console.log("selectCurrencReducer")
            console.log("State -> ",state)
            console.log("Action -> ", action)

            const arrDate = action.arrayDate;

            //массив данных по курсу
            let propsData =action.arrayData
            let isData=false;
            let oldData=0;

            state.forEach((currenc,index)=>{
                isData=false;
                state[index].data=[];
                arrDate.forEach(date => {

                    propsData.some(item => {
                        if (date === item.exchangedate&&currenc.label===item.cc) {
                            state[index].data.push(item.rate)
                            // cursData.push(item.rate)
                            oldData=item.rate;
                            isData=true;
                            return true;
                        }
                        return false;
                    })
                    if(!isData){
                        // cursData.push(oldData)
                        state[index].data.push(oldData)
                    }
                })
            })
    //         State ->  (2) [{…}, {…}]
        //          0:  backgroundColor: "rgba(150,210,210,0.4)"
        //              borderCapStyle: "butt"
        //              borderColor: "rgba(150,210,210,1)"
        //              borderDash: []
        //              borderDashOffset: 0
        //              borderJoinStyle: "miter"
        //              data: []
        //              fill: true
        //              label: "USD"
        //              lineTension: 0.1
        //              pointBackgroundColor: "#fff"
        //              pointBorderColor: "rgba(150,210,210,1)"
        //              pointBorderWidth: 1
        //              pointHitRadius: 5
        //              pointHoverBackgroundColor: "rgba(150,210,210,1)"
        //              pointHoverBorderColor: "rgba(220,220,220,1)"
        //              pointHoverBorderWidth: 2
        //              pointHoverRadius: 5
        //              pointRadius: 1
        //              __proto__: Object
        //          1: {label: "EUR",
        //              fill: true, lineTension: 0.1, backgroundColor: "rgba(210,150,210,0.4)",
        //              borderColor: "rgba(210,150,210,1)", …}length: 2__proto__: Array(0)
    // selectCurrencReducer.js:69
        //  Action ->  {
        //              type: "FILL_NBU_DATA",
        //              arrayData: Array(16)}
        //                  arrayData: Array(16)0: {
        //  r030: 840, txt: "Долар США", rate: 26.751287, cc: "USD", exchangedate: "08.11.2017"}1: {r030: 978, txt: "Євро", rate: 31.262018, cc: "EUR", exchangedate: "01.11.2017"}2: {r030: 840, txt: "Долар США", rate: 26.862019, cc: "USD", exchangedate: "01.11.2017"}3: {r030: 978, txt: "Євро", rate: 31.36159, cc: "EUR", exchangedate: "03.11.2017"}4: {r030: 840, txt: "Долар США", rate: 26.931378, cc: "USD", exchangedate: "03.11.2017"}5: {r030: 840, txt: "Долар США", rate: 26.878403, cc: "USD", exchangedate: "02.11.2017"}6: {r030: 978, txt: "Євро", rate: 31.211202, cc: "EUR", exchangedate: "02.11.2017"}7: {r030: 840, txt: "Долар США", rate: 26.931378, cc: "USD", exchangedate: "04.11.2017"}8: {r030: 840, txt: "Долар США", rate: 26.931378, cc: "USD", exchangedate: "05.11.2017"}9: {r030: 978, txt: "Євро", rate: 31.36159, cc: "EUR", exchangedate: "04.11.2017"}10: {r030: 978, txt: "Євро", rate: 31.36159, cc: "EUR", exchangedate: "05.11.2017"}11: {r030: 840, txt: "Долар США", rate: 26.962647, cc: "USD", exchangedate: "06.11.2017"}12: {r030: 978, txt: "Євро", rate: 31.430358, cc: "EUR", exchangedate: "06.11.2017"}13: {r030: 840, txt: "Долар США", rate: 26.850348, cc: "USD", exchangedate: "07.11.2017"}14: {r030: 978, txt: "Євро", rate: 31.119553, cc: "EUR", exchangedate: "07.11.2017"}15: {r030: 978, txt: "Євро", rate: 30.929838, cc: "EUR", exchangedate: "08.11.2017"}length: 16__proto__: Array(0)type: "FILL_NBU_DATA"__proto__: Object


        default:
            return state
    }
}
