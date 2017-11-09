import moment from 'moment';

export function date(object) {
    return { type: 'SET_DATE', object}
}

export function setDate(object) {
// console.log("dateAction object->", object)
    const startDate=moment(object.startDate, "DD.MM.YYYY");
    const endDate= moment(object.endDate, "DD.MM.YYYY");
    let contDate=[startDate.format("DD.MM.YYYY")];
    if(endDate.diff(startDate, "years")<3) {
        while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
            contDate.push(startDate.add(1, 'day').format("DD.MM.YYYY"))
        }
    }else{
        console.log("Too long a gap between dates");
    }

    // console.log("dispatch date->", contDate)
    return (dispatch) => {
       // console.log("setDate", object)

        dispatch(date(contDate));

    }
}
//
// const startDate=moment(this.props.date.startDate, "DD.MM.YYYY");
// const endDate= moment(this.props.date.endDate, "DD.MM.YYYY");
// let contDate=[startDate.format(format)];
// if(endDate.diff(startDate, "years")<2) {
//     while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
//         contDate.push(startDate.add(1, 'day').format(format))
//     }
// }else{
//     alert("Too long a gap between dates");
// }
// return contDate;