import moment from "moment";

const defaultInit=[
    moment().format("DD.MM.YYYY"),

]

export default function dateReducer(state = defaultInit, action) {
    switch (action.type) {
        case "SET_DATE":

            return action.object


        default:
            return state
    }

}

