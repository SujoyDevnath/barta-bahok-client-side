const intialState = {
    users: []
};

export const userReduser = (state = intialState, { type, payload }) => {
    // console.log('payload', payload);
    switch (type) {
        case 'USER':
            return { ...state, firebase: payload };
        default:
            return state;
    }
};