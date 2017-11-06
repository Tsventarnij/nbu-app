import moment from "moment";

const defaultInit={
    startDate: moment().format("DD.MM.YYYY"),
    endDate: moment().format("DD.MM.YYYY"),
}

export default function dateReducer(state = defaultInit, action) {
    switch (action.type) {
        case "SET_DATE":

            return {
                ...state,
                ...action.object
            }

        default:
            return state
    }

}

