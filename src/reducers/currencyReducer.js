export default function currencyReducer(state = {}, action) {
    switch (action.type) {
        case "GET_CURRENCY":
            return {
                ...state,
                ...action.object
            }

        default:
            return state
    }

}
