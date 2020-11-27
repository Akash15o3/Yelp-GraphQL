import { combineReducers } from "redux";
import getType from "./getType";
import getusernamecust from "./getusernamecust";

const allReducers = combineReducers({
  getType: getType,
  getusernamecust: getusernamecust,
});

export default allReducers;
