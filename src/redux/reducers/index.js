import { combineReducers } from "redux";
import { firebaseReducer } from "./firebaseReduser";
import { postsReduser } from "./postsReduser";
const reducers = combineReducers({
    firebaseReducer: firebaseReducer,
    postsReduser: postsReduser
    // product: selectedProductsReducer,
});
export default reducers;
