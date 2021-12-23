// import { ActionTypes } from "../constants/action-types";
const intialState = {
    firebase: {},
};

export const firebaseReducer = (state = intialState, { type, payload }) => {
    // console.log('payload', payload);
    switch (type) {
        case 'FIREBASE':
            return { ...state, firebase: payload };
        default:
            return state;
    }
};

// export const selectedProductsReducer = (state = {}, { type, payload }) => {
//     console.log(type);
//     switch (type) {
//         case ActionTypes.SELECTED_PRODUCT:
//             return { ...state, ...payload };
//         case ActionTypes.REMOVE_SELECTED_PRODUCT:
//             return {};
//         default:
//             return state;
//     }
// };
