const defaultInit=[]

export default function currencyReducer(state = [], action) {
    switch (action.type) {
        case "GET_CURRENCY":
            console.log("state", state, "action",action)
            return [
                ...state,
                action.object

        // {
        //     value:action.object.cc,
        //     label:action.object.text
        // }
            ]

        default:
            return state
    }

}
