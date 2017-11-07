const defaultInit=[]
// function randomColor(){
//     // let color=Math.round(Math.random()*80+140)+", "+Math.round(Math.random()*80+140)+", "+Math.round(Math.random()*80+140)+", ";
//
//     return color;
// }

export default function selectCurrencReducer(state = defaultInit, action) {
    switch (action.type) {
        case "SET_CURRENC":


           return action.object.map(function(item, index){

               const color =[
                   "150,210,210,",
                   "210,150,210,",
                   "210,210,150,",
                   "150,150,210,",
                   "210,150,150,",
                   "150,210,150,"
               ]
               //let data =[];
               //console.log("Select Currenc this", )

               return({
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

        default:
            return state
    }
}
