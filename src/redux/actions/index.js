export const firebase = (payload) => {
    return {
        type: 'FIREBASE',
        payload: payload,
    };
};
export const user = (payload) => {
    return {
        type: 'USER',
        payload: payload,
    };
};
export const setPosts = (payload) => {
    return {
        type: 'SET_POSTS',
        payload: payload,
    };
};