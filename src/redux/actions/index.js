export const firebase = (payload) => {
    return {
        type: 'FIREBASE',
        payload: payload,
    };
};