import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

//Every time an action is dispatched, this reducer will be called, and it’s responsible for addressing the action or not, hence the switch-case syntax.
function visibilityFilter(state = "", action) {
    //Returning an empty state
    switch (action.type) {
        case SET_FILTER:
            return action.value; //Returning the value that's in the action
        default:
            //A reducer must always return a state
            return state;
    }
}

function movies(state = [], action) {
    switch (
        action.type //Switch receiving action type movies
    ) {
        case SET_MOVIES:
            return action.value; //Returning the value that's in the action
        default:
            //A reducer must always return a state
            return state;
    }
}

const moviesApp = combineReducers({
    //Combining the both reducer functins, importing it as well
    //passing both reducer's funtions
    visibilityFilter,
    movies,
});

export default moviesApp; //exporting the dafault which is the both reducers