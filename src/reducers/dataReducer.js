export default function dataReducer(state = {}, action) {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                ...action.object
            }

        default:
            return state
    }

}
