const defaultInit=[]
    // "USD": [],



export default function dataReducer(state = defaultInit, action) {
    switch (action.type) {
        case "GET_NBU_DATA":
           // console.log("state",state, "action", action)
           return [
                   ...state,
                    ...action.object

           ]
            // return {
            //     ...state,
            //     ...action.object
            // }

        default:
            return state
    }

}
//
// Object.assign({}, state, {
//     todos: [
//         ...state.todos,
//         {
//             text: action.text,
//             completed: false
//         }
//     ]
// })
