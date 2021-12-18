import { combineReducers } from "redux";
import { firebaseReducer } from "./firebaseReduser";
const reducers = combineReducers({
    firebaseReducer: firebaseReducer
    // product: selectedProductsReducer,
});
export default reducers;
