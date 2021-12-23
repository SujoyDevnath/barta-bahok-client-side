const intialState = {
    posts: [],
};

export const postsReduser = (state = intialState, { type, payload }) => {
    // console.log('payload', payload);
    switch (type) {
        case 'SET_POSTS':
            return { ...state, posts: payload };
        default:
            return state;
    }
};