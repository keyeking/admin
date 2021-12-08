import data from "./state"
// let state1 = 0
let reducer = (state = data,action) => {
    // console.log(action)
    switch (action.type) {
        case "ajaxTable":
            return state = action.data;
        case "decrement":
            // eslint-disable-next-line no-self-assign
            return state = state;
        default:
            return state;
    }
}

export default reducer;