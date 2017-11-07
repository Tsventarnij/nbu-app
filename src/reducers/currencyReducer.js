 const defaultInit=[]

export default function currencyReducer(state =[], action) {
    switch (action.type) {
        case "GET_CURRENCY":
            return action.object;

        default:
            return state
    }

}
