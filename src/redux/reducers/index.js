import { combineReducers } from "redux";
import { allUsersReducer } from "./userReducers";

const reducers = combineReducers({
  allUsers: allUsersReducer,
});

export default reducers;
