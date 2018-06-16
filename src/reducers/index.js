import { combineReducers } from "redux";
import userReducer from "./userReducer";
import testReducer from "./testReducer";
import questionReducer from "./questionReducer";
import authedUserReducer from "./authedUserReducer";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  questions: questionReducer,
  users: userReducer,
  authedUser: authedUserReducer,
  loadingBar: loadingBarReducer,
  toastr: toastrReducer,
  form: formReducer,
  test: testReducer
});
